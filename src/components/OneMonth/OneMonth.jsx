import { useEffect, useRef, useState } from 'react';
import './CSS/OneMonth.css';

const detectWebmSupport = () => {
  if (typeof document === 'undefined') {
    return false;
  }

  const video = document.createElement('video');

  return Boolean(
    video.canPlayType(
      'video/webm; codecs="vp8, vorbis"',
    ),
  );
};

const OneMonth = ({
  webmUrl,
  mp4Url,
  description,
}) => {
  const [canPlayWebm] = useState(
    detectWebmSupport,
  );

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
          {canPlayWebm && (
            <source
              src={webmUrl}
              type="video/webm"
            />
          )}

          <source
            src={mp4Url}
            type="video/mp4"
          />

          Your browser does not support the video tag.
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
