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
import Apoyo from './components/Apoyo';
import Navbar from './components/shared/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faStar } from '@fortawesome/free-solid-svg-icons';
function App() {
  const [country, setCountry] = useState('pe');
  const [countryName, setCountryName] = useState('');
  const [channels, setChannels] = useState([]);
  const [streamUrl, setStreamUrl] = useState('');
  const [currentChannelName, setCurrentChannelName] = useState('');
  const [selectedChannel, setSelectedChannel] = useState(null);

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
    if (selectedChannel) {
      setStreamUrl(selectedChannel.url);
      setCurrentChannelName(selectedChannel.name);
    }
  }, [selectedChannel]);

  const nextChannel = () => {
    if (filteredChannels.length === 0) return;
    const nextIndex = (currentChannelIndex + 1) % filteredChannels.length;
    setCurrentChannelIndex(nextIndex);
    setSelectedChannel(filteredChannels[nextIndex]);
  };

  const prevChannel = () => {
    if (filteredChannels.length === 0) return;
    const prevIndex = (currentChannelIndex - 1 + filteredChannels.length) % filteredChannels.length;
    setCurrentChannelIndex(prevIndex);
    setSelectedChannel(filteredChannels[prevIndex]);
  };

  const toggleFavorite = (channel) => {
    if (!channel.logo) {
      console.error('Este canal no tiene logo, no se puede agregar a favoritos.');
      return;  // No agregar el canal a favoritos si no tiene logo
    }

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
      <Navbar />

      <CountrySelector selected={country} onChange={setCountry} />

      <div className="main-video-lista" id='tv'>
        <div className="custom-video-player">


          {streamUrl && (
            <div className="custom-channel-name-display">
              <h3>{currentChannelName}</h3>
            </div>
          )}

          {streamUrl ? <Player streamUrl={streamUrl} /> : <CanalDefecto />}

          {filteredChannels.length > 0 && (
            <div className="custom-controls">
              <button onClick={prevChannel}><FontAwesomeIcon icon={faArrowUp} /> Anterior</button>
              <button onClick={nextChannel}><FontAwesomeIcon icon={faArrowDown} /> Siguiente</button>
            </div>

          )}
        </div>

        <div className="listaCanales">
          <p>Selecciona un pais y selecciona tu canal</p>
          <CountrySelector selected={country} onChange={setCountry} />
          <input
            type="text"
            placeholder="🔍 Buscar canal..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="searchInput"
          />
          {status && <p>{status}</p>}

          {filteredChannels.length > 0 && (
            <ChannelSelector
              channels={filteredChannels}
              onSelect={(url) => {
                const index = filteredChannels.findIndex((c) => c.url === url);
                setCurrentChannelIndex(index); // para usar anterior/siguiente
                setSelectedChannel(filteredChannels[index]);
              }}

              onFavorite={toggleFavorite}
              favorites={favorites}
            />
          )}
        </div>

      </div>

      <div className="map-container" id='mapa3d'>
        <p>Selecciona un país en el mapa para ver sus canales</p>
        <WorldMap onCountryClick={handleCountrySelect} />
      </div>

      {countryName && <p>País seleccionado: {countryName}</p>}

      {status && <p>{status}</p>}

      {favorites.length > 0 && (
        < >
          <h2 id='favoritos'><FontAwesomeIcon icon={faStar} /> Favoritos</h2>
          <ChannelSelector
            channels={favorites}  // Asegurándote de pasar los canales favoritos con logo
            onSelect={(url) => {
              const channel = favorites.find((c) => c.url === url);
              setCurrentChannelIndex(-1);
              setSelectedChannel(channel);
            }}
            onFavorite={toggleFavorite}
            favorites={favorites}
          />
        </>
      )}
      <Apoyo />
      <Footer />

    </div>
  );
}

export default App;
