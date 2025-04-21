import { useEffect } from 'react';
import Hls from 'hls.js';

export default function Player({ streamUrl }) {
  useEffect(() => {
    const video = document.getElementById('video');

    if (!streamUrl || !video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(streamUrl);
      hls.attachMedia(video);
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = streamUrl;
    }
  }, [streamUrl]);

  return (
    <video
      id="video"
      controls
      autoPlay
      style={{ width: '90%', marginTop: '20px', borderRadius: '12px', backgroundColor: '#000' }}
    ></video>
  );
}
