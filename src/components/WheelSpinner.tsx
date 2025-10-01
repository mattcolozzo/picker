import React from 'react';

interface WheelSpinnerProps {
  wordsMap: Map<string, string>;
  selectedWord: string | null;
  isPicking: boolean;
  animationDuration: number;
}

const WheelSpinner: React.FC<WheelSpinnerProps> = ({
  wordsMap,
  selectedWord,
  isPicking,
  animationDuration,
}) => {
  const words = Array.from(wordsMap.values());
  const totalWords = words.length;
  const [finalRotation, setFinalRotation] = React.useState(0);

  // Calculate where the wheel should stop to land on selected word
  React.useEffect(() => {
    if (selectedWord && totalWords > 0) {
      const selectedIndex = words.indexOf(selectedWord);
      if (selectedIndex !== -1) {
        const sliceAngle = 360 / totalWords;
        const sliceCenterAngle = selectedIndex * sliceAngle + sliceAngle / 2;

        // Calculate multiple rotations + alignment (more spins for longer durations)
        const baseRotations =
          Math.max(3, Math.floor(animationDuration / 1000)) * 360;
        const targetRotation = baseRotations - sliceCenterAngle;

        setFinalRotation(targetRotation);
      }
    }
  }, [selectedWord, totalWords, words, animationDuration]);

  if (totalWords === 0) {
    return (
      <div className='wheel-container'>
        <div className='wheel-empty'>
          <p>Add words to see the wheel!</p>
        </div>
      </div>
    );
  }

  // Calculate slice angles
  const sliceAngle = 360 / totalWords;
  const radius = 120;
  const centerX = 150;
  const centerY = 150;

  // Color palette for wheel slices
  const colors = [
    '#4f9eff',
    '#ff6b6b',
    '#51cf66',
    '#ffd43b',
    '#9775fa',
    '#ff8787',
    '#69db7c',
    '#ffe066',
    '#a78bfa',
    '#74c0fc',
    '#ff9999',
    '#8ce99a',
    '#ffec99',
    '#b197fc',
    '#91d5ff',
  ];

  const createSlicePath = (index: number): string => {
    const startAngle = (index * sliceAngle - 90) * (Math.PI / 180);
    const endAngle = ((index + 1) * sliceAngle - 90) * (Math.PI / 180);

    const x1 = centerX + radius * Math.cos(startAngle);
    const y1 = centerY + radius * Math.sin(startAngle);
    const x2 = centerX + radius * Math.cos(endAngle);
    const y2 = centerY + radius * Math.sin(endAngle);

    const largeArcFlag = sliceAngle > 180 ? 1 : 0;

    return [
      `M ${centerX} ${centerY}`,
      `L ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      'Z',
    ].join(' ');
  };

  const getTextPosition = (index: number) => {
    const angle = (index * sliceAngle + sliceAngle / 2 - 90) * (Math.PI / 180);
    const textRadius = radius * 0.7;
    const x = centerX + textRadius * Math.cos(angle);
    const y = centerY + textRadius * Math.sin(angle);
    return { x, y };
  };

  // Simple wheel styling - use single animation that handles both spinning and deceleration
  const getWheelStyle = () => {
    if (selectedWord && !isPicking) {
      // Deceleration animation from 0 to final position
      return {
        animation: `wheelDecelerate ${animationDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`,
        '--final-rotation': `${finalRotation}deg`,
      } as React.CSSProperties;
    } else if (isPicking) {
      // Keep spinning during picking
      return {
        animation: `wheelSpinContinuous 0.8s linear infinite`,
      };
    }
    // Default position
    return {
      transform: `rotate(0deg)`,
    };
  };

  return (
    <div className='wheel-container'>
      <div className='wheel-title'>
        <h3>Wheel of Words</h3>
      </div>
      <div className='wheel-spinner'>
        {/* Pointer - stays fixed */}
        <div className='wheel-pointer'></div>

        <svg
          width='300'
          height='300'
          className='wheel-svg'
          style={getWheelStyle()}
        >
          {/* Wheel slices */}
          {words.map((word, index) => {
            const isSelected = word === selectedWord;
            const color = colors[index % colors.length];
            const textPos = getTextPosition(index);

            return (
              <g key={index}>
                <path
                  d={createSlicePath(index)}
                  fill={color}
                  stroke='#fff'
                  strokeWidth='2'
                  className={`wheel-slice ${isSelected ? 'selected' : ''}`}
                />
                <text
                  x={textPos.x}
                  y={textPos.y}
                  textAnchor='middle'
                  dominantBaseline='central'
                  className='wheel-text'
                  fontSize={totalWords > 8 ? '10' : '12'}
                  fill='white'
                  fontWeight='bold'
                  textShadow='1px 1px 2px rgba(0,0,0,0.5)'
                >
                  {word.length > 8 ? `${word.substring(0, 6)}...` : word}
                </text>
              </g>
            );
          })}

          {/* Center circle */}
          <circle
            cx={centerX}
            cy={centerY}
            r='20'
            fill='rgba(255, 255, 255, 0.9)'
            stroke='#333'
            strokeWidth='2'
          />
        </svg>
      </div>
    </div>
  );
};

export default WheelSpinner;
