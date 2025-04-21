import { useEffect } from 'react';
import Hls from 'hls.js';

export default function Player({ streamUrl }) {
  useEffect(() => {
    const video = document.getElementById('video');
    let hls;

    if (!streamUrl || !video) return;

    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(streamUrl);
      hls.attachMedia(video);
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = streamUrl;
    }

    // Limpieza al desmontar o cambiar de canal
    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [streamUrl]);

  return (
    <video
      id="video"
      controls
      autoPlay

      playsInline
      style={{
        width: '100%',
        maxWidth: '100%',
        marginTop: '2em',
        borderRadius: '0.5em',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        border: '1px solid #ccc',

        backgroundColor: 'blue',
        aspectRatio: '16/9',
      }}
    ></video>
  );
}
