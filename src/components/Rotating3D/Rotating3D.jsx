import './CSS/Rotating3D.css';

const Rotating3D = ({ webmUrl, mp4Url, description }) => {
  return (
    <div className="circle-video-heading-container">
      <div className="circle-video">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        >
          <source src={webmUrl} type="video/webm" />
          <source src={mp4Url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="text-content">
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Rotating3D;
