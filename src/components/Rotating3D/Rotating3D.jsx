import { useEffect, useRef } from 'react';
import './CSS/Rotating3D.css';

const Rotating3D = ({ webmUrl, description }) => {
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
        rootMargin: '150px',
        threshold: 0.1,
      },
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="circle-video-heading-container">
      <div className="circle-video">
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          preload="metadata"
        >
          <source
            src={webmUrl}
            type='video/webm; codecs="vp9"'
          />

          Your browser does not support WebM video.
        </video>
      </div>

      <div className="text-content">
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Rotating3D;
