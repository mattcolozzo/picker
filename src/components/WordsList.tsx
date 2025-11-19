import React from 'react';

interface WordsListProps {
  words: string[];
  allWords: string[];
  onRemoveWord: (word: string) => void;
  selectedWord: string | null;
  filterValue: string;
  onFilterChange: (value: string) => void;
}

const WordsList: React.FC<WordsListProps> = ({
  words,
  allWords,
  onRemoveWord,
  selectedWord,
  filterValue,
  onFilterChange,
}) => {
  return (
    <div className='words-container'>
      <h3>Your Words ({allWords.length})</h3>
      <input
        type='text'
        placeholder='Filter words...'
        value={filterValue}
        onChange={e => onFilterChange(e.target.value)}
        className='word-filter-input'
      />
      <div className='words-list'>
        {words.length === 0 && filterValue ? (
          <div className='no-results'>No matching words found</div>
        ) : (
          words.map((word, index) => {
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
          })
        )}
      </div>
    </div>
  );
};

export default WordsList;
