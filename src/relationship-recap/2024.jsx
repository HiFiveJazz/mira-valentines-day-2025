import CardSlider from '../components/CardSlider';
import BentoBoxGrid from '../components/BentoBox/BentoBoxGrid'
// import riversideImages from '../data/riverside';
// import iceskatingImages from '../data/ice-skating';
import Divider from '../components/Divider/Divider'
import Subdivider from '../components/Subdivider/Subdivider';
import PasswordRedirect from '../components/PasswordRedirect/PasswordRedirect';
import BingoCard from '../components/BingoCard/BingoCard';
import Spotify from '../components/Spotify/Spotify';

const RR24 = () => {

  return (
    <div> 
      <Divider title='2024 Relationship Recap!'/>
      <Subdivider title="This year, we wrote our story in texts, laughs, and unforgettable moments. Let's take a look back at all the ways we made magic together."/>
      <Divider title='Statistics'/>
      <Subdivider title="Words, emojis, and inside jokes: we broke some serious records this year! Here's the data back up our legendary bond."/>
      <BentoBoxGrid/>
      <Divider title='Spotify Blend'/>
      <Subdivider title="Your top tracks, my top tracks, and everything in between. Our Spotify Blend is the playlist that defines our year—full of hits, memories, and everything we vibed to together."/>
      <Spotify playlistId="28LjezHHXUbKIFKP97MIGt" />
      <Divider title='Bucket List for 2025'/>
      <Subdivider title="Big dreams, bold plans, and unforgettable vibes—our 2025 bucket list is set to make history. Here’s what’s queued up for our year ahead!"/>
      <BingoCard/>
      <Divider title='Dates'/>
      <Subdivider title="From late-night adventures to cozy resturaunts, here's how we turned ordinary days into extraordinary memories"/>
      {/* <CardSlider images={riversideImages} title="Riverside Lights" /> */}
      {/* <CardSlider images={iceskatingImages} title="Ice Skating" /> */}
      <PasswordRedirect correctPassword="sushi" target="/invitation" />
    </div>
  );
};

export default RR24;
