import LoveLetter from '../components/LoveLetter/LoveLetter'
import Love from '../components/Love/Love'
import OneMonth from '../components/OneMonth/OneMonth'
import ScrapbookWEBM from '../components/OneMonth/Source/one-month.webm'
import ScrapbookMP4 from '../components/OneMonth/Source/one-month.mp4'
import ScrapbookCompressedMP4 from '../components/OneMonth/Source/one-month-compressed.mp4'
// import Video from '../components/Video/Video.jsx'

const Moments = () => {

  return (
    <div> 
      <LoveLetter/>
      <Love/>
      <OneMonth
        webmUrl={ScrapbookWEBM}
        mp4Url={ScrapbookCompressedMP4}        
      />
    </div>
  );
};

export default Moments;
