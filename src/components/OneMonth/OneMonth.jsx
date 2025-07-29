import React, { useState, useEffect, useRef } from 'react';
import './CSS/OneMonth.css';

const OneMonth = ({ webmUrl, mp4Url, title, description }) => {
  const [canPlayWebm, setCanPlayWebm] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = document.createElement('video');
    const support = video.canPlayType('video/webm; codecs="vp8, vorbis"');
    setCanPlayWebm(!!support);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play();
        } else {
          video.pause();
        }
      },
      { threshold: 0.5 } // 50% of the video must be in view
    );

    observer.observe(video);

    return () => {
      observer.unobserve(video);
    };
  }, []);

  const handleFullscreen = () => {
    const video = videoRef.current;
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.webkitEnterFullscreen) {
      video.webkitEnterFullscreen(); // iOS Safari
    } else if (video.msRequestFullscreen) {
      video.msRequestFullscreen(); // IE/Edge
    }
  };

  return (
    <div className="round-video-heading-container">
      <div className="round-video">
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          controls
        >
          {canPlayWebm && <source src={webmUrl} type="video/webm" />}
          <source src={mp4Url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <button className="fullscreen-button" onClick={handleFullscreen}>
          Fullscreen
        </button>
      </div>
      <div className="text-content">
        <p>{description}</p>
      </div>
    </div>
  );
};

export default OneMonth;
