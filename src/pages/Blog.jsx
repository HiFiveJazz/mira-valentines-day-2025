import AboutMeTitle from '../components/AboutMeTitle/AboutMeTitle';
import AboutMeInfo from '../components/AboutMeInfo/AboutMeInfo';
import Education from '../components/Education/Education';
import Masters from '../components/Masters/Masters'
import Philosophy from '../components/Philosophy/Philosophy'
import Spotify from '../components/Spotify/Spotify';

const AboutMe = () => {
  return (
    <div> 
      <AboutMeTitle/>
      <AboutMeInfo/>
      <Education/>
      <Masters/>
      <Philosophy/>
      <Spotify
        leftId='3NkV3yyTJPxG5yaObwHSm4'
        rightId='4zq29ES7hggbT08kft4yoK'
        // width='500px'
        // height='500vh'
      />
    </div>
  );
};

export default AboutMe;
