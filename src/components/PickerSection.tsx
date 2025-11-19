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
  const [buttonPosition, setButtonPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

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
      setButtonPosition({
        top: Math.random() * 70 + 10,
        left: Math.random() * 70 + 10,
      });
      onHardModeClick();
    } else {
      setButtonPosition(null);
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
        className={`pick-button ${isPicking ? 'picking' : ''} ${
          buttonPosition ? 'flying' : ''
        }`}
        style={
          buttonPosition
            ? {
                position: 'fixed',
                top: `${buttonPosition.top}%`,
                left: `${buttonPosition.left}%`,
              }
            : {}
        }
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
