import { audioBufferToDataUrl } from "@remotion/media-utils";

const SAMPLE_RATE = 44100;

export const generateWhooshTone = async (): Promise<string> => {
  const duration = 0.5; // 500ms
  const offlineContext = new OfflineAudioContext({
    numberOfChannels: 2,
    length: SAMPLE_RATE * duration,
    sampleRate: SAMPLE_RATE,
  });

  const oscillator = offlineContext.createOscillator();
  const gainNode = offlineContext.createGain();
  const filterNode = offlineContext.createBiquadFilter();

  oscillator.connect(filterNode);
  filterNode.connect(gainNode);
  gainNode.connect(offlineContext.destination);

  // White noise-like sweep using sawtooth
  oscillator.type = "sawtooth";
  oscillator.frequency.setValueAtTime(100, 0);
  oscillator.frequency.exponentialRampToValueAtTime(800, duration * 0.3);
  oscillator.frequency.exponentialRampToValueAtTime(200, duration);

  filterNode.type = "lowpass";
  filterNode.frequency.setValueAtTime(200, 0);
  filterNode.frequency.exponentialRampToValueAtTime(2000, duration * 0.3);
  filterNode.frequency.exponentialRampToValueAtTime(400, duration);

  gainNode.gain.setValueAtTime(0.01, 0);
  gainNode.gain.linearRampToValueAtTime(0.3, duration * 0.2);
  gainNode.gain.exponentialRampToValueAtTime(0.01, duration);

  oscillator.start(0);
  oscillator.stop(duration);

  const buffer = await offlineContext.startRendering();
  return audioBufferToDataUrl(buffer);
};
