import React, { useState, useEffect } from 'react';
import './CSS/Rotating3D.css';

const Rotating3D = ({ webmUrl, mp4Url, title, description }) => {
  const [canPlayWebm, setCanPlayWebm] = useState(false);

  useEffect(() => {
    const video = document.createElement('video');
    // test if WebM/Vorbis is supported
    const support = video.canPlayType('video/webm; codecs="vp8, vorbis"');
    setCanPlayWebm(!!support);
  }, []);

  return (
    <div className="circle-video-heading-container">
      <div className="circle-video">
        <video autoPlay loop muted playsInline>
          {canPlayWebm && (
            <source src={webmUrl} type="video/webm" />
          )}
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

