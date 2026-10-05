import React from 'react';

interface AudioControllerProps {
  enabled: boolean;
}

const AudioController: React.FC<AudioControllerProps> = ({ enabled }) => {
  React.useEffect(() => {
    const handlePlayAudio = (e: Event) => {
      if (!enabled) return;
      const customEvent = e as CustomEvent;
      // In a real app, play specific audio file for customEvent.detail
      console.log(`[AUDIO] Playing sound: ${customEvent.detail}`);
    };

    window.addEventListener('play_audio', handlePlayAudio);
    return () => window.removeEventListener('play_audio', handlePlayAudio);
  }, [enabled]);

  return null;
};

export default AudioController;
