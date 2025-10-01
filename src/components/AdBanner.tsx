import React, { useState, useEffect } from 'react';

const AdBanner: React.FC = () => {
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  const ads = [
    {
      id: 1,
      title: 'FREE MONEY!!!',
      subtitle: 'Click here to WIN $1000!!!',
      content: '⭐ NO CREDIT CHECK ⭐',
      bgColor: '#ff0000',
      textColor: '#ffff00',
      blink: true,
    },
    {
      id: 2,
      title: 'AMAZING OFFER!',
      subtitle: 'Lose Weight FAST!',
      content: 'Doctors HATE this trick!',
      bgColor: '#00ff00',
      textColor: '#ff0000',
      blink: false,
    },
    {
      id: 3,
      title: '🍆 HOT SINGLES 🍑',
      subtitle: 'in your area!',
      content: '🍆 CHAT NOW! 🍑',
      bgColor: '#ff00ff',
      textColor: '#ffffff',
      blink: true,
    },
    {
      id: 4,
      title: 'DOWNLOAD NOW!',
      subtitle: '100% FREE SOFTWARE',
      content: '💿 NO VIRUSES! 💿',
      bgColor: '#0000ff',
      textColor: '#00ffff',
      blink: false,
    },
    {
      id: 5,
      title: 'EARN $$$ AT HOME',
      subtitle: 'Work from HOME!',
      content: '$500/day GUARANTEED!',
      bgColor: '#ffff00',
      textColor: '#ff0000',
      blink: true,
    },
    {
      id: 6,
      title: 'CONGRATULATIONS!',
      subtitle: 'You are visitor #999,999!',
      content: 'CLAIM YOUR PRIZE! 🎁',
      bgColor: '#00ffff',
      textColor: '#000000',
      blink: false,
    },
  ];

  // Cycle through ads every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdIndex(prevIndex => (prevIndex + 1) % ads.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [ads.length]);

  const currentAd = ads[currentAdIndex];

  return (
    <div className='ad-banner'>
      <div
        className={`ad-content ${currentAd.blink ? 'blink' : ''}`}
        style={{
          backgroundColor: currentAd.bgColor,
          color: currentAd.textColor,
        }}
      >
        <div className='ad-title'>{currentAd.title}</div>
        <div className='ad-subtitle'>{currentAd.subtitle}</div>
        <div className='ad-text'>{currentAd.content}</div>
        <div className='ad-click'>👆 CLICK HERE! 👆</div>
      </div>

      {/* Classic scrolling marquee */}
      <div className='ad-marquee'>
        <marquee>🌟 LIMITED TIME OFFER! ACT NOW! 🌟</marquee>
      </div>

      {/* Ad counter */}
      <div className='ad-counter'>
        Ad {currentAdIndex + 1} of {ads.length}
      </div>
    </div>
  );
};

export default AdBanner;
