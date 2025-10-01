import React from 'react';

interface WordsListProps {
  words: string[];
  onRemoveWord: (word: string) => void;
  selectedWord: string | null;
}

const WordsList: React.FC<WordsListProps> = ({
  words,
  onRemoveWord,
  selectedWord,
}) => {
  return (
    <div className='words-container'>
      <h3>Your Words ({words.length})</h3>
      <div className='words-list'>
        {words.map((word, index) => {
          const isSelected = word === selectedWord;
          return (
            <div
              key={index}
              className={`word-chip ${isSelected ? 'selected' : ''}`}
            >
              <span>{word}</span>
              <button
                onClick={() => onRemoveWord(word)}
                className='remove-button'
                aria-label={`Remove ${word}`}
              >
                ×
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WordsList;
