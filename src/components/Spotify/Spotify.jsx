import React from 'react';
import './CSS/Spotify.css';

const SpotifyEmbed = ({ id, height = 352 }) => (
  <div className="embed">
    <iframe
      src={`https://open.spotify.com/embed/playlist/${id}?utm_source=generator`}
      width="100%"
      height={height}
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
      title={`Spotify Playlist ${id}`}
      style={{ borderRadius: 12, border: 0 }}
      allowFullScreen
    />
  </div>
);

const Spotify = ({
  leftId,
  rightId,
  height = 352,            // common height for both embeds
  showLabelOn = 'left',     // 'left' | 'right' | 'both' | 'none'
  labelText = 'MUSIC',
}) => {
  return (
    <div className="philosophy-overlay-wrapper">
      <div className="spotify">
        {/* LEFT COLUMN */}
        <div className="intro-box">
          {(showLabelOn === 'left' || showLabelOn === 'both') && (
            <p className="philosophy-intro">{labelText}</p>
          )}
          <SpotifyEmbed id={leftId} height={height} />
        </div>

        {/* RIGHT COLUMN */}
        <div className="second-box">
          {(showLabelOn === 'right' || showLabelOn === 'both') && (
            <p className="philosophy-intro">{labelText}</p>
          )}
          {rightId ? (
            <SpotifyEmbed id={rightId} height={height} />
          ) : (
            <div className="embed placeholder">
              <div>No playlist set for the right column.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Spotify;

