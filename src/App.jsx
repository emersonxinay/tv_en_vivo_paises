import { useState, useEffect } from 'react';
import CountrySelector from './components/CountrySelector';
import ChannelSelector from './components/ChannelSelector';
import Player from './components/Player';
import { fetchChannelsByCountry } from './services/iptvService';
import './App.css';

function App() {
  const [country, setCountry] = useState('');
  const [channels, setChannels] = useState([]);
  const [streamUrl, setStreamUrl] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const loadChannels = async () => {
      if (!country) return;
      setStatus('🔄 Cargando canales...');
      try {
        const data = await fetchChannelsByCountry(country);
        setChannels(data);
        setStatus(`✅ ${data.length} canales encontrados`);
      } catch {
        setStatus('❌ Error al cargar canales');
      }
    };
    loadChannels();
  }, [country]);

  return (
    <div className="App">
      <h1>🌍 TV en Vivo por País</h1>
      <CountrySelector selected={country} onChange={setCountry} />
      {status && <p>{status}</p>}
      {channels.length > 0 && (
        <ChannelSelector channels={channels} onSelect={setStreamUrl} />
      )}
      {streamUrl && <Player streamUrl={streamUrl} />}
    </div>
  );
}

export default App;
