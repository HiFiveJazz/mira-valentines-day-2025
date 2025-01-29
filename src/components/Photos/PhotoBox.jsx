import React, { useState, useEffect } from 'react';
import SizeableBox from '../SizeableBox/SizeableBox';
import totalWordsSent from '../../images/relationship-rewind-2024/total-words-sent.svg';
import totalMessageSent from '../../images/relationship-rewind-2024/total-message-sent.svg';
import totalIndividualMessageSent from '../../images/relationship-rewind-2024/total-message-sent-individual.svg';
import messageOverDay from '../../images/relationship-rewind-2024/message-over-day.svg';
import jazzFrequency from '../../images/relationship-rewind-2024/jazz.png';
import miraFrequency from '../../images/relationship-rewind-2024/mira.png';

const PhotoBox= () => {
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
      imageUrl: totalWordsSent,
      height: isMobile ? '300px' : '400px',
      width: isMobile ? '75%' : '400px',
    },
    {
      id: 5,
      type: 'image',
      imageUrl: totalMessageSent,
      height: isMobile ? '15.5rem' : '400px',
      width: isMobile ? '26rem' : '700px',
    },
    {
      id: 7,
      type: 'image',
      imageUrl: totalIndividualMessageSent,
      height: isMobile ? '15.5rem' : '400px',
      width: isMobile ? '26rem' : '700px',
    },
    {
      id: 8,
      type: 'image',
      imageUrl: messageOverDay,
      height: isMobile ? '16.5rem' : '400px',
      width: isMobile ? '26rem' : '550px',
    },
    {
      id: 11,
      type: 'image',
      imageUrl: jazzFrequency,
      height: isMobile ? '12.5rem' : '400px',
      width: isMobile ? '26rem' : '830px',
    },
    {
      id: 12,
      type: 'image',
      imageUrl: miraFrequency,
      height: isMobile ? '12.5rem' : '400px',
      width: isMobile ? '26rem' : '830px',
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

export default PhotoBox;

