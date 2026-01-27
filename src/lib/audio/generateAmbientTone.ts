import { audioBufferToDataUrl } from "@remotion/media-utils";

const SAMPLE_RATE = 44100;

export const generateAmbientTone = async (durationSeconds: number): Promise<string> => {
  const offlineContext = new OfflineAudioContext({
    numberOfChannels: 2,
    length: SAMPLE_RATE * durationSeconds,
    sampleRate: SAMPLE_RATE,
  });

  // Create multiple oscillators for a rich pad sound
  const frequencies = [130.81, 164.81, 196.00]; // C3, E3, G3 (C major chord)

  frequencies.forEach((freq) => {
    const osc = offlineContext.createOscillator();
    const gain = offlineContext.createGain();

    osc.connect(gain);
    gain.connect(offlineContext.destination);

    osc.type = "sine";
    osc.frequency.value = freq;

    // Gentle volume with slow fade in/out
    gain.gain.setValueAtTime(0, 0);
    gain.gain.linearRampToValueAtTime(0.06, 2);
    gain.gain.setValueAtTime(0.06, durationSeconds - 2);
    gain.gain.linearRampToValueAtTime(0, durationSeconds);

    osc.start(0);
    osc.stop(durationSeconds);
  });

  const buffer = await offlineContext.startRendering();
  return audioBufferToDataUrl(buffer);
};
