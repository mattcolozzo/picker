import React, { useState, useRef } from 'react';

interface PopupAdProps {
  id: number;
  position: { top: number; left: number };
  onClose: (id: number) => void;
}

const PopupAd: React.FC<PopupAdProps> = ({ id, position, onClose }) => {
  const [pos, setPos] = useState(position);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const adRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.popup-close, .popup-action')) {
      return;
    }

    if (adRef.current) {
      const rect = adRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsDragging(true);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const newLeft = ((e.clientX - dragOffset.x) / window.innerWidth) * 100;
      const newTop = ((e.clientY - dragOffset.y) / window.innerHeight) * 100;

      setPos({
        left: Math.max(0, Math.min(85, newLeft)),
        top: Math.max(0, Math.min(85, newTop)),
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  const adTypes = [
    {
      title: 'VIRUS ALERT!',
      content: 'Your computer has 37 viruses!',
      action: 'SCAN NOW',
      bgColor: '#ff0000',
      textColor: '#ffff00',
    },
    {
      title: 'YOU WON!',
      content: 'Claim your $5,000 prize!',
      action: 'CLAIM NOW',
      bgColor: '#00ff00',
      textColor: '#000000',
    },
    {
      title: 'URGENT!',
      content: 'Update Flash Player NOW!',
      action: 'DOWNLOAD',
      bgColor: '#ff8800',
      textColor: '#ffffff',
    },
    {
      title: 'CONGRATULATIONS!',
      content: "You're the 1,000,000th visitor!",
      action: 'GET PRIZE',
      bgColor: '#0000ff',
      textColor: '#ffffff',
    },
    {
      title: 'ALERT!',
      content: 'Someone is using your IP!',
      action: 'PROTECT NOW',
      bgColor: '#ff00ff',
      textColor: '#ffffff',
    },
  ];

  const adContent = adTypes[id % adTypes.length];

  return (
    <div
      ref={adRef}
      className={`popup-ad ${isDragging ? 'dragging' : ''}`}
      style={{
        top: `${pos.top}%`,
        left: `${pos.left}%`,
        backgroundColor: adContent.bgColor,
        color: adContent.textColor,
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      onMouseDown={handleMouseDown}
    >
      <button className='popup-close' onClick={() => onClose(id)}>
        ✕
      </button>
      <div className='popup-title'>{adContent.title}</div>
      <div className='popup-content'>{adContent.content}</div>
      <button className='popup-action'>{adContent.action}</button>
    </div>
  );
};

export default PopupAd;
