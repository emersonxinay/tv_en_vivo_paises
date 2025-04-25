import { useState, useEffect } from 'react';
import CountrySelector from './components/CountrySelector';
import ChannelSelector from './components/ChannelSelector';
import Player from './components/Player';
import WorldMap from './components/WorldMap'; // Importa el nuevo componente
import { fetchChannelsByCountry } from './services/iptvService';
import CanalDefecto from './components/CanalDefecto';
import './App.css';
import './assets/Video.css';
import Footer from './components/shared/Footer';

function App() {
  const [country, setCountry] = useState('');
  const [countryName, setCountryName] = useState(''); // Nuevo estado para el nombre del país
  const [channels, setChannels] = useState([]);
  const [streamUrl, setStreamUrl] = useState('');
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

  // Filtrar canales basado en búsqueda
  const filteredChannels = channels.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (currentChannelIndex >= 0 && filteredChannels.length > 0) {
      setStreamUrl(filteredChannels[currentChannelIndex].url);
    }
  }, [currentChannelIndex, filteredChannels]);

  const nextChannel = () => {
    if (filteredChannels.length === 0) return;
    const nextIndex = (currentChannelIndex + 1) % filteredChannels.length;
    setCurrentChannelIndex(nextIndex);
  };

  const prevChannel = () => {
    if (filteredChannels.length === 0) return;
    const prevIndex =
      (currentChannelIndex - 1 + filteredChannels.length) % filteredChannels.length;
    setCurrentChannelIndex(prevIndex);
  };

  const toggleFavorite = (channel) => {
    const exists = favorites.find((f) => f.url === channel.url);
    let updated;
    if (exists) {
      updated = favorites.filter((f) => f.url !== channel.url);
    } else {
      updated = [...favorites, channel];
    }
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  const handleCountrySelect = (code, name) => {
    setCountry(code);
    setCountryName(name); // Actualiza el nombre del país
  };

  return (
    <div className="App">
      <div className='nav_code'>
        <p>
          <a href="http://compilandocode.com" target="_blank" rel="noopener noreferrer">Compilandocode</a> y
          <a href="http://emersonespinoza.com" target="_blank" rel="noopener noreferrer">Emerson Espinoza</a> te ayuda a ver
        </p>
        <img src="../public/img/compitv.png" className='imgLogo' alt="" width="70rem" />
        <h2> TV en Vivo por País</h2>
      </div>

      <CountrySelector selected={country} onChange={setCountry} />

      <div className='main-video-lista'>
        <div className='custom-video-player'>
          {/* Mostrar nombre del canal seleccionado */}
          {streamUrl && filteredChannels.length > 0 && (
            <div className="custom-channel-name-display">
              <h3>{filteredChannels[currentChannelIndex]?.name}</h3>
            </div>
          )}

          {/* Si no hay streamUrl, muestra el canal por defecto */}
          {streamUrl ? <Player streamUrl={streamUrl} /> : <CanalDefecto />}

          {/* Botones para navegar entre canales */}
          {filteredChannels.length > 0 && (
            <div className="custom-controls">
              <button onClick={prevChannel}>🔼 Anterior</button>
              <button onClick={nextChannel}>🔽 Siguiente</button>
            </div>
          )}
        </div>


        {/* Lista de canales */}
        <div className='listaCanales'>
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
              onSelect={setStreamUrl}
              onFavorite={toggleFavorite}
              favorites={favorites}
            />
          )}
        </div>
      </div>

      {/* Mapa mundial */}
      <div className='map-container'>
        <p>Selecciona un país en el mapa para ver sus canales</p>
        <WorldMap onCountryClick={handleCountrySelect} />
      </div>

      {/* Nombre del país seleccionado */}
      {countryName && <p> País seleccionado: {countryName}</p>}

      {/* Estado de carga */}
      {status && <p>{status}</p>}

      {/* Favoritos */}
      {favorites.length > 0 && (
        <>
          <h2>⭐ Favoritos</h2>
          <ChannelSelector
            channels={favorites}
            onSelect={setStreamUrl}
            onFavorite={toggleFavorite}
            favorites={favorites}
          />
        </>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
