import React, { useState } from 'react';

interface PickerSectionProps {
  words: string[];
  selectedWord: string | null;
  isPicking: boolean;
  onPickRandomWord: () => void;
  hardMode: boolean;
  hardModeClickCount: number;
  onHardModeToggle: () => void;
  onHardModeClick: () => void;
  onSpawnAd: () => void;
}

const PickerSection: React.FC<PickerSectionProps> = ({
  words,
  selectedWord,
  isPicking,
  onPickRandomWord,
  hardMode,
  hardModeClickCount,
  onHardModeToggle,
  onHardModeClick,
  onSpawnAd,
}) => {
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });

  if (words.length === 0) {
    return null;
  }

  const handlePickClick = () => {
    if (hardMode) {
      onSpawnAd();
      onSpawnAd();
    } else {
      onSpawnAd();
    }

    if (!hardMode) {
      onPickRandomWord();
      return;
    }

    if (hardModeClickCount < 4) {
      const randomPercentX = Math.random() * 60 - 30;
      const randomPercentY = Math.random() * 50 - 25;

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const randomX = (randomPercentX / 100) * viewportWidth;
      const randomY = (randomPercentY / 100) * viewportHeight;

      setButtonPosition({ x: randomX, y: randomY });
      onHardModeClick();
    } else {
      setButtonPosition({ x: 0, y: 0 });
      onPickRandomWord();
    }
  };

  return (
    <div className='picker-section'>
      {selectedWord && (
        <div className={`selected-word ${isPicking ? 'animating' : 'final'}`}>
          <h2>Selected:</h2>
          <div className='selected-word-display'>{selectedWord}</div>
        </div>
      )}

      <button
        onClick={handlePickClick}
        disabled={isPicking}
        className={`pick-button ${isPicking ? 'picking' : ''}`}
        style={{
          transform: `translate(${buttonPosition.x}px, ${buttonPosition.y}px)`,
          transition: 'transform 0.3s ease',
        }}
      >
        {isPicking ? 'Picking...' : 'Pick'}
      </button>

      <button
        onClick={onHardModeToggle}
        className={`hard-mode-button ${hardMode ? 'active' : ''}`}
      >
        {hardMode ? '🔥 Hard Mode ON' : '👶 Hard Mode OFF'}
      </button>
    </div>
  );
};

export default PickerSection;
