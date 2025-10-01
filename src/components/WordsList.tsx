import React from 'react';

interface WordsListProps {
  words: string[];
  onRemoveWord: (word: string) => void;
}

const WordsList: React.FC<WordsListProps> = ({ words, onRemoveWord }) => {
  return (
    <div className='words-container'>
      <h3>Your Words ({words.length})</h3>
      <div className='words-list'>
        {words.map((word, index) => (
          <div key={index} className='word-chip'>
            <span>{word}</span>
            <button
              onClick={() => onRemoveWord(word)}
              className='remove-button'
              aria-label={`Remove ${word}`}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WordsList;
