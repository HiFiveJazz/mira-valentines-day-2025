import React, { useState, useEffect } from 'react';
import SizeableBox from '../SizeableBox/SizeableBox';
import bingoCard from '../../images/relationship-rewind-2024/bingo-card.svg';
const BingoCard = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const items = [
    {
      id: 1,
      type: 'image',
      imageUrl: bingoCard,
      height: isMobile ? '28rem' : '700px',
      width: isMobile ? '28rem' : '700px',
    },
  ];

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
      {items.map((item) => (
        <SizeableBox
          key={item.id}
          type={item.type}
          imageUrl={item.imageUrl}
          title={item.title}
          description={item.description}
          height={item.height}
          width={item.width}
          onClick={() => console.log(`Box ${item.id} clicked!`)}
        />
      ))}
    </div>
  );
};

export default BingoCard;

