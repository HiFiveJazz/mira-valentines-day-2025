import LoveLetter from '../components/LoveLetter/LoveLetter'
import Love from '../components/Love/Love'
import OneMonth from '../components/OneMonth/OneMonth'
import ScrapbookWEBM from '../components/OneMonth/Source/one-month.webm'

const Moments = () => {

  return (
    <div> 
      <LoveLetter/>
      <Love/>
      <OneMonth
        webmUrl={ScrapbookWEBM}
      />
    </div>
  );
};

export default Moments;
