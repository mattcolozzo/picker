import React from 'react';

interface PickerSectionProps {
  words: string[];
  selectedWord: string | null;
  isPicking: boolean;
  onPickRandomWord: () => void;
}

const PickerSection: React.FC<PickerSectionProps> = ({
  words,
  selectedWord,
  isPicking,
  onPickRandomWord,
}) => {
  if (words.length === 0) {
    return null;
  }

  return (
    <div className='picker-section'>
      {selectedWord && (
        <div className={`selected-word ${isPicking ? 'animating' : 'final'}`}>
          <h2>Selected:</h2>
          <div className='selected-word-display'>{selectedWord}</div>
        </div>
      )}

      <button
        onClick={onPickRandomWord}
        disabled={isPicking}
        className={`pick-button ${isPicking ? 'picking' : ''}`}
      >
        {isPicking ? 'Picking...' : 'Pick Random Word'}
      </button>
    </div>
  );
};

export default PickerSection;
