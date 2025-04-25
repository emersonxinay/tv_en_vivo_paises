import { useState, useEffect } from 'react';
import CountrySelector from './components/CountrySelector';
import ChannelSelector from './components/ChannelSelector';
import Player from './components/Player';
import WorldMap from './components/WorldMap';
import { fetchChannelsByCountry } from './services/iptvService';
import CanalDefecto from './components/CanalDefecto';
import './App.css';
import './assets/Video.css';
import Footer from './components/shared/Footer';
import logoImg from '../public/img/compitv.png';

function App() {
  const [country, setCountry] = useState('');
  const [countryName, setCountryName] = useState('');
  const [channels, setChannels] = useState([]);
  const [streamUrl, setStreamUrl] = useState('');
  const [currentChannelName, setCurrentChannelName] = useState('');
  const [status, setStatus] = useState('');
  const [search, setSearch] = useState('');
  const [currentChannelIndex, setCurrentChannelIndex] = useState(-1);
  const [favorites, setFavorites] = useState(() => {
    const fav = localStorage.getItem('favorites');
    return fav ? JSON.parse(fav) : [];
  });

  useEffect(() => {
    if (country) {
      const loadChannels = async () => {
        setStatus('🔄 Cargando canales...');
        try {
          const data = await fetchChannelsByCountry(country);
          setChannels(data);
          setStatus(`${data.length} canales encontrados`);
        } catch {
          setStatus('Error al cargar canales');
        }
      };
      loadChannels();
    }
  }, [country]);

  const filteredChannels = channels.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (currentChannelIndex >= 0) {
      const channel = filteredChannels[currentChannelIndex];
      if (channel) {
        setStreamUrl(channel.url);
        setCurrentChannelName(channel.name);
      }
    }
  }, [currentChannelIndex, filteredChannels]);


  const nextChannel = () => {
    if (filteredChannels.length === 0) return;
    const nextIndex = (currentChannelIndex + 1) % filteredChannels.length;
    setCurrentChannelIndex(nextIndex);
  };

  const prevChannel = () => {
    if (filteredChannels.length === 0) return;
    const prevIndex = (currentChannelIndex - 1 + filteredChannels.length) % filteredChannels.length;
    setCurrentChannelIndex(prevIndex);
  };

  const toggleFavorite = (channel) => {
    const exists = favorites.find((f) => f.url === channel.url);
    const updated = exists
      ? favorites.filter((f) => f.url !== channel.url)
      : [...favorites, channel];
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  const handleCountrySelect = (code, name) => {
    setCountry(code);
    setCountryName(name);
  };

  return (
    <div className="App">
      <div className="nav_container">
        <div className="nav_content">
          <div className="nav_links">
            <a href="http://compilandocode.com" target="_blank" rel="noopener noreferrer">Compilandocode</a>
            <span className="separator">|</span>
            <a href="http://emersonespinoza.com" target="_blank" rel="noopener noreferrer">Emerson Espinoza</a>
          </div>

          <div className="nav_logo">
            <img src={logoImg} alt="CompiTV Logo" />
          </div>

          <h2 className="nav_title">TV en Vivo por País</h2>
        </div>
      </div>

      <CountrySelector selected={country} onChange={setCountry} />

      <div className="main-video-lista">
        <div className="custom-video-player">
          {streamUrl && (
            <div className="custom-channel-name-display">
              <h3>{currentChannelName}</h3>
            </div>
          )}

          {streamUrl ? <Player streamUrl={streamUrl} /> : <CanalDefecto />}

          {filteredChannels.length > 0 && (
            <div className="custom-controls">
              <button onClick={prevChannel}>🔼 Anterior</button>
              <button onClick={nextChannel}>🔽 Siguiente</button>
            </div>
          )}
        </div>

        <div className="listaCanales">
          <input
            type="text"
            placeholder="🔍 Buscar canal..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="searchInput"
          />

          {filteredChannels.length > 0 && (
            <ChannelSelector
              channels={filteredChannels}
              onSelect={(url) => {
                const index = filteredChannels.findIndex((c) => c.url === url);
                setCurrentChannelIndex(index);
                setStreamUrl(url);
                setCurrentChannelName(filteredChannels[index]?.name || '');
              }}
              onFavorite={toggleFavorite}
              favorites={favorites}
            />
          )}
        </div>
      </div>

      <div className="map-container">
        <p>Selecciona un país en el mapa para ver sus canales</p>
        <WorldMap onCountryClick={handleCountrySelect} />
      </div>

      {countryName && <p>País seleccionado: {countryName}</p>}

      {status && <p>{status}</p>}

      {favorites.length > 0 && (
        <>
          <h2>⭐ Favoritos</h2>
          <ChannelSelector
            channels={favorites}
            onSelect={(url) => {
              const channel = favorites.find((c) => c.url === url);
              setCurrentChannelIndex(-1);
              setStreamUrl(url);
              setCurrentChannelName(channel?.name || '');
            }}
            onFavorite={toggleFavorite}
            favorites={favorites}
          />
        </>
      )}

      <Footer />
    </div>
  );
}

export default App;
