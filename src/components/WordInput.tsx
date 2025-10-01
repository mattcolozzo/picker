import React from 'react';

interface WordInputProps {
  inputValue: string;
  onInputChange: (value: string) => void;
  onAddWord: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
}

const WordInput: React.FC<WordInputProps> = ({
  inputValue,
  onInputChange,
  onAddWord,
  onKeyPress,
}) => {
  return (
    <div className='input-section'>
      <input
        type='text'
        value={inputValue}
        onChange={e => onInputChange(e.target.value)}
        onKeyPress={onKeyPress}
        placeholder='Enter a word...'
        className='word-input'
      />
      <button onClick={onAddWord} className='add-button'>
        Add Word
      </button>
    </div>
  );
};

export default WordInput;
