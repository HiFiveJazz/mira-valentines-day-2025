import React, { useState, useEffect } from 'react';
import SizeableBox from '../SizeableBox/SizeableBox';
import totalWordsSent from '../../images/relationship-rewind-2024/total-words-sent.svg';
import totalMessageSent from '../../images/relationship-rewind-2024/total-message-sent.svg';
import totalIndividualMessageSent from '../../images/relationship-rewind-2024/total-message-sent-individual.svg';
import messageOverDay from '../../images/relationship-rewind-2024/message-over-day.svg';
import jazzFrequency from '../../images/relationship-rewind-2024/jazz.png';
import miraFrequency from '../../images/relationship-rewind-2024/mira.png';

const BentoBoxGrid = () => {
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
      id: 2,
      type: 'text',
      title: 'Total iMessages Sent',
      description: '8,601 messages exchanged!',
      height: isMobile ? '150px' : '175px',
      width: isMobile ? '87.5%' : '400px',
    },
    {
      id: 3,
      type: 'text',
      title: 'Most Active Day',
      description: 'December 22nd, with 1,171 Messages!',
      height: isMobile ? '150px' : '175px',
      width: isMobile ? '87.5%' : '400px',
    },
    {
      id: 4,
      type: 'text',
      title: 'Who Sent the First Meme?',
      description: 'Jazz did! 🥇 True relationship goals.',
      height: isMobile ? '350px' : '400px',
      width: isMobile ? '150px' : '200px',
    },
    {
      id: 5,
      type: 'image',
      imageUrl: totalMessageSent,
      height: isMobile ? '15.5rem' : '400px',
      width: isMobile ? '26rem' : '700px',
    },
    {
      id: 6,
      type: 'text',
      title: 'Average Word Per Message',
      description: (
        <div>
          <li>Jazz: 6.063</li>
          <li>Mira: 8.691</li>
        </div>
      ),
      height: isMobile ? '350px' : '400px',
      width: isMobile ? '150px' : '200px',
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
      id: 9,
      type: 'text',
      title: "Jazz's Most Sent Words",
      description: '',
      height: isMobile ? '350px' : '400px',
      width: isMobile ? '150px' : '200px',
    },
    {
      id: 10,
      type: 'text',
      title: "Jazz's Most Sent Emojis",
      description: (
        <div>
          <li>😭 - 178 Times!</li>
          <li>😤 - 75 Times!</li>
          <li>😂 - 31 Times!</li>
        </div>
      ),
      height: isMobile ? '350px' : '400px',
      width: isMobile ? '150px' : '200px',
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
    {
      id: 13,
      type: 'text',
      title: "Mira's Most Sent Words",
      description: '',
      height: isMobile ? '350px' : '400px',
      width: isMobile ? '150px' : '200px',
    },
    {
      id: 14,
      type: 'text',
      title: "Mira's Most Sent Emojis",
      description: (
        <div>
          <li>😭 - 187 Times!</li>
          <li>😤 - 33 Times!</li>
          <li>☺️ - 27 Times!</li>
        </div>
      ),
      height: isMobile ? '350px' : '400px',
      width: isMobile ? '150px' : '200px',
    },
    {
      id: 15,
      type: 'text',
      title: 'Total Words Sent',
      description: '60,569 Words Exchanged!',
      height: isMobile ? '350px' : '400px',
      width: isMobile ? '150px' : '200px',
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

export default BentoBoxGrid;

