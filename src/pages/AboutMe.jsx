import AboutMeTitle from '../components/AboutMeTitle/AboutMeTitle';
import AboutMeInfo from '../components/AboutMeInfo/AboutMeInfo';
import Education from '../components/Education/Education';
import Philosophy from '../components/Philosophy/Philosophy'
import Spotify from '../components/Spotify/Spotify';

const AboutMe = () => {
  return (
    <div> 
      <AboutMeTitle/>
      <AboutMeInfo/>
      <Education/>
      <Philosophy/>
      <Spotify
        playlistId='3NkV3yyTJPxG5yaObwHSm4'
        width='100%'
        height='500vh'
      />
    </div>
  );
};

export default AboutMe;
