import React from 'react';

interface ControlPanelProps {
  animationDuration: number;
  interval: number;
  allowRepeats: boolean;
  onAnimationDurationChange: (value: number) => void;
  onIntervalChange: (value: number) => void;
  onAllowRepeatsChange: (value: boolean) => void;
  onLoadDefaultWords: () => void;
  onClearAllWords: () => void;
  onUploadFile: (names: string[]) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  animationDuration,
  interval,
  allowRepeats,
  onAnimationDurationChange,
  onIntervalChange,
  onAllowRepeatsChange,
  onLoadDefaultWords,
  onClearAllWords,
  onUploadFile,
}) => {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = event => {
      try {
        const json = JSON.parse(event.target?.result as string);
        const names = Array.isArray(json)
          ? json
          : json.names || json.words || [];
        onUploadFile(names);
      } catch (error) {
        alert(
          'Invalid JSON file. Please upload a valid JSON array or object with "names" or "words" property.'
        );
      }
    };
    reader.readAsText(file);

    e.target.value = '';
  };
  return (
    <div className='control-panel'>
      <h3>Animation Settings</h3>

      <div className='control-group'>
        <label htmlFor='duration'>Duration (ms)</label>
        <input
          id='duration'
          type='range'
          min='1000'
          max='10000'
          step='500'
          value={animationDuration}
          onChange={e => onAnimationDurationChange(Number(e.target.value))}
          className='control-slider'
        />
        <span className='control-value'>{animationDuration}ms</span>
      </div>

      <div className='control-group'>
        <label htmlFor='interval'>Speed (ms)</label>
        <input
          id='interval'
          type='range'
          min='50'
          max='1000'
          step='50'
          value={interval}
          onChange={e => onIntervalChange(Number(e.target.value))}
          className='control-slider'
        />
        <span className='control-value'>{interval}ms</span>
      </div>

      <div className='control-group'>
        <label htmlFor='allowRepeats'>Allow Repeat Selections</label>
        <div className='toggle-container'>
          <input
            id='allowRepeats'
            type='checkbox'
            checked={allowRepeats}
            onChange={e => onAllowRepeatsChange(e.target.checked)}
            className='toggle-checkbox'
          />
          <label htmlFor='allowRepeats' className='toggle-label'>
            <span className='toggle-slider'></span>
          </label>
        </div>
      </div>

      <div className='control-info'>
        <p>Duration: How long the picking animation runs</p>
        <p>Speed: How fast words change (minimum 150ms for comfort)</p>
        <p>Allow Repeats: Whether the same word can be picked twice in a row</p>
        <p>
          Upload JSON: Upload an array of names or object with "names" property
        </p>
      </div>

      <div className='control-actions'>
        <label htmlFor='file-upload' className='control-button upload'>
          Upload JSON File
          <input
            id='file-upload'
            type='file'
            accept='.json'
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
        </label>

        <button onClick={onLoadDefaultWords} className='control-button'>
          Load Default Words
        </button>
        <button onClick={onClearAllWords} className='control-button clear'>
          Clear All Words
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;
