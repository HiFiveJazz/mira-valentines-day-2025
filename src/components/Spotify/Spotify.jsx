import React from 'react';

const Spotify = ({ playlistId, width = '100%', height = '352' }) => {
  return (

    <div style={{ borderRadius: '12px', overflow: 'hidden', maxWidth: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '4rem', marginRight: '4rem',}}>
      <iframe
        style={{ borderRadius: '12px',}}
        src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator`}
        width={width}
        height={height}
        // frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title="Spotify Playlist"
      ></iframe>
    </div>
  );
};

export default Spotify;

