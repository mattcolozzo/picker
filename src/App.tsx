import React, { useState } from 'react';
import './App.css';
import wordsDatabase from './words-database.json';
import ControlPanel from './components/ControlPanel';
import WordInput from './components/WordInput';
import WordsList from './components/WordsList';
import PickerSection from './components/PickerSection';
import WheelSpinner from './components/WheelSpinner';
import AdBanner from './components/AdBanner';
import PopupAd from './components/PopupAd';

const App = () => {
  const [wordsMap, setWordsMap] = useState<Map<string, string>>(new Map());
  const [inputValue, setInputValue] = useState('');
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [isPicking, setIsPicking] = useState(false);
  const [animationDuration, setAnimationDuration] = useState(3000);
  const [interval, setInterval] = useState(500);
  const [allowRepeats, setAllowRepeats] = useState(false);
  const [popupAds, setPopupAds] = useState<
    Array<{ id: number; top: number; left: number }>
  >([]);
  const [adCounter, setAdCounter] = useState(0);

  // Helper to get words array from map for display
  const words = Array.from(wordsMap.values());

  const addWord = () => {
    const newWord = inputValue.trim();
    if (newWord && !words.includes(newWord)) {
      const newKey = `word-${Date.now()}-${Math.random()
        .toString(36)
        .substr(2, 9)}`;
      setWordsMap(new Map(wordsMap.set(newKey, newWord)));
      setInputValue('');
    }
  };

  const removeWord = (wordToRemove: string) => {
    const keyToRemove = Array.from(wordsMap.entries()).find(
      ([key, word]) => word === wordToRemove
    )?.[0];
    if (keyToRemove) {
      const newMap = new Map(wordsMap);
      newMap.delete(keyToRemove);
      setWordsMap(newMap);

      if (selectedWord === wordToRemove) {
        setSelectedWord(null);
        setSelectedKey(null);
      }
    }
  };

  const loadDefaultWords = () => {
    const newWords = wordsDatabase.defaultWords.filter(
      word => !words.includes(word)
    );
    const newMap = new Map(wordsMap);
    newWords.forEach(word => {
      const newKey = `word-${Date.now()}-${Math.random()
        .toString(36)
        .substr(2, 9)}`;
      newMap.set(newKey, word);
    });
    setWordsMap(newMap);
  };

  const clearAllWords = () => {
    setWordsMap(new Map());
    setSelectedWord(null);
    setSelectedKey(null);
  };

  const spawnPopupAd = () => {
    const newAd = {
      id: adCounter,
      top: Math.random() * 70 + 10,
      left: Math.random() * 70 + 10,
    };
    setPopupAds([...popupAds, newAd]);
    setAdCounter(adCounter + 1);
  };

  const closePopupAd = (id: number) => {
    setPopupAds(popupAds.filter(ad => ad.id !== id));
  };

  const pickRandomWord = async () => {
    if (wordsMap.size === 0) return;

    // Spawn a new popup ad!
    spawnPopupAd();

    setIsPicking(true);
    setSelectedWord(null);

    // Use pleasant visual interval while respecting total duration
    const minPleasantInterval = 150; // Minimum 150ms for comfortable viewing
    const effectiveInterval = Math.max(interval, minPleasantInterval);
    const iterations = Math.max(
      1,
      Math.floor(animationDuration / effectiveInterval)
    );

    let availableKeys = Array.from(wordsMap.keys());
    let lastSelectedKey: string | null = null;

    for (let i = 0; i < iterations; i++) {
      if (
        i === iterations - 1 &&
        !allowRepeats &&
        selectedKey &&
        availableKeys.length > 1
      ) {
        availableKeys = availableKeys.filter(key => key !== selectedKey);
      }

      if (lastSelectedKey && availableKeys.length > 1) {
        availableKeys = availableKeys.filter(key => key !== lastSelectedKey);
      }

      const randomIndex = Math.floor(Math.random() * availableKeys.length);
      const currentKey = availableKeys[randomIndex];
      const currentWord = wordsMap.get(currentKey)!;

      setSelectedWord(currentWord);
      lastSelectedKey = currentKey;

      if (i < iterations - 1) {
        availableKeys = Array.from(wordsMap.keys());
      }

      await new Promise(resolve => setTimeout(resolve, effectiveInterval));
    }

    setSelectedKey(lastSelectedKey);
    setIsPicking(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addWord();
    }
  };

  return (
    <div className='app-container'>
      <ControlPanel
        animationDuration={animationDuration}
        interval={interval}
        allowRepeats={allowRepeats}
        onAnimationDurationChange={setAnimationDuration}
        onIntervalChange={setInterval}
        onAllowRepeatsChange={setAllowRepeats}
        onLoadDefaultWords={loadDefaultWords}
        onClearAllWords={clearAllWords}
      />

      <div className='content'>
        <h1>Pick me!</h1>
        <p>Add words to your list and let fate decide!</p>

        <WordInput
          inputValue={inputValue}
          onInputChange={setInputValue}
          onAddWord={addWord}
          onKeyPress={handleKeyPress}
        />

        <div className='horizontal-layout'>
          <WordsList
            words={words}
            onRemoveWord={removeWord}
            selectedWord={selectedWord}
          />

          <PickerSection
            words={words}
            selectedWord={selectedWord}
            isPicking={isPicking}
            onPickRandomWord={pickRandomWord}
          />
        </div>

        <WheelSpinner
          wordsMap={wordsMap}
          selectedWord={selectedWord}
          isPicking={isPicking}
          animationDuration={animationDuration}
        />
      </div>

      {/* Retro Ad Banner */}
      <AdBanner />

      {/* Dynamic Popup Ads */}
      {popupAds.map(ad => (
        <PopupAd
          key={ad.id}
          id={ad.id}
          position={{ top: ad.top, left: ad.left }}
          onClose={closePopupAd}
        />
      ))}
    </div>
  );
};

export default App;
