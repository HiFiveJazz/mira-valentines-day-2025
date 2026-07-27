import { useEffect, useRef } from 'react';
import './CSS/OneMonth.css';

const OneMonth = ({
  webmUrl,
  description,
}) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      {
        threshold: 0.5,
      },
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleFullscreen = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.webkitEnterFullscreen) {
      video.webkitEnterFullscreen();
    } else if (video.msRequestFullscreen) {
      video.msRequestFullscreen();
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
          preload="metadata"
        >
          <source
            src={webmUrl}
            type='video/webm; codecs="vp9"'
          />

          Your browser does not support WebM video.
        </video>

        <button
          type="button"
          className="fullscreen-button"
          onClick={handleFullscreen}
        >
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
