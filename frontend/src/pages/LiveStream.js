// src/pages/LiveStream.js
import React, { useEffect, useState } from 'react';
import liveStreamService from '../services/liveStreamService';

const LiveStream = () => {
  const [liveStreamUrl, setLiveStreamUrl] = useState('');

  useEffect(() => {
    liveStreamService.getLiveStream().then(data => setLiveStreamUrl(data.url));
  }, []);

  return (
    <div>
      <h1>Live Stream</h1>
      {liveStreamUrl ? (
        <iframe
          src={liveStreamUrl}
          width="100%"
          height="500"
          frameBorder="0"
          allowFullScreen
          title="Live Stream"
        ></iframe>
      ) : (
        <p>Loading live stream...</p>
      )}
    </div>
  );
};

export default LiveStream;
