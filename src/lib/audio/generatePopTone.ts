import { audioBufferToDataUrl } from "@remotion/media-utils";

const SAMPLE_RATE = 44100;

export const generatePopTone = async (): Promise<string> => {
  const duration = 0.08; // 80ms
  const offlineContext = new OfflineAudioContext({
    numberOfChannels: 2,
    length: SAMPLE_RATE * duration,
    sampleRate: SAMPLE_RATE,
  });

  const oscillator = offlineContext.createOscillator();
  const gainNode = offlineContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(offlineContext.destination);

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(880, 0); // A5
  oscillator.frequency.exponentialRampToValueAtTime(440, duration); // Drop to A4

  gainNode.gain.setValueAtTime(0.4, 0);
  gainNode.gain.exponentialRampToValueAtTime(0.01, duration);

  oscillator.start(0);
  oscillator.stop(duration);

  const buffer = await offlineContext.startRendering();
  return audioBufferToDataUrl(buffer);
};
