import React from 'react';
import SizeableBox from '../SizeableBox/SizeableBox';
import totalWordsSent from '../../images/relationship-rewind-2024/total-words-sent.svg';
import totalMessageSent from '../../images/relationship-rewind-2024/total-message-sent.svg';
import totalIndividualMessageSent from '../../images/relationship-rewind-2024/total-message-sent-individual.svg';
import messageOverDay from '../../images/relationship-rewind-2024/message-over-day.svg';
import jazzFrequency from '../../images/relationship-rewind-2024/jazz.png';
import miraFrequency from '../../images/relationship-rewind-2024/mira.png';

const BentoBoxGrid = () => {
  // Data for the grid items
  const items = [
    { id: 1, type: 'image', imageUrl: totalWordsSent, height: '400px', width: '400px' },
    { id: 2, type: 'text', title: 'Total iMessages Sent', description: '8,601 messages exchanged!', height: '175px', width: '400px' },
    { id: 3, type: 'text', title: 'Most Active Day', description: 'December 22nd, with 1,171 Messages!', height: '175px', width: '400px' },
    { id: 4, type: 'text', title: "Who Sent the First Meme?", description: "Jazz did! 🥇 True relationship goals.", height: '400px', width: '200px' },
    { id: 5, type: 'image', imageUrl: totalMessageSent, height: '400px', width: '700px' },
    { id: 6, type: 'text', title: "Average Word Per Message", description: <div><li>Jazz: 6.063</li><li>Mira: 8.691</li></div>, height: '400px', width: '200px' },
    { id: 7, type: 'image', imageUrl: totalIndividualMessageSent, height: '400px', width: '700px' },
    { id: 8, type: 'image', imageUrl: messageOverDay, height: '400px', width: '550px' },
    { id: 9, type: 'text', title: "Jazz's Most Sent Words", description: "", height: '400px', width: '200px' },
    { id: 10, type: 'text', title: "Jazz's Most Sent Emojis", description: <div><li>😭 - 178 Times!</li><li>😤 - 75 Times!</li><li>😂 - 31 Times!</li></div>, height: '400px', width: '200px' },
    { id: 11, type: 'image', imageUrl: jazzFrequency, height: '400px', width: '830px' },
    { id: 12, type: 'image', imageUrl: miraFrequency, height: '400px', width: '830px' },
    { id: 13, type: 'text', title: "Mira's Most Sent Words", description: "", height: '400px', width: '200px' },
    { id: 14, type: 'text', title: "Mira's Most Sent Emojis", description: <div><li>😭 - 187 Times!</li><li>😤 - 33 Times!</li><li>☺️ - 27 Times!</li></div>, height: '400px', width: '200px' },
    { id: 15, type: 'text', title: "Total Words Sent", description: "60,569 Words Exchanged!", height: '400px', width: '200px' },
  ];

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
      {items.map((item) => (
        <SizeableBox
          key={item.id} // Unique key for React's rendering
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

