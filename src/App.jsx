import { useState, useEffect } from 'react';
import CountrySelector from './components/CountrySelector';
import ChannelSelector from './components/ChannelSelector';
import Player from './components/Player';
import WorldMap from './components/WorldMap'; // Importa el nuevo componente
import { fetchChannelsByCountry } from './services/iptvService';
import './App.css';

function App() {
  const [country, setCountry] = useState('');
  const [countryName, setCountryName] = useState(''); // Nuevo estado para el nombre del país
  const [channels, setChannels] = useState([]);
  const [streamUrl, setStreamUrl] = useState('');
  const [status, setStatus] = useState('');
  const [search, setSearch] = useState('');
  const [favorites, setFavorites] = useState(() => {
    const fav = localStorage.getItem('favorites');
    return fav ? JSON.parse(fav) : [];
  });

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

  const filteredChannels = channels.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

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
      <h1>🌍 TV en Vivo por País</h1>

      {/* Selector de país */}
      <CountrySelector selected={country} onChange={setCountry} />

      {/* Mapa mundial */}
      <div style={{ width: '100%', height: '500px', margin: '20px 0' }}>
        <WorldMap onCountryClick={handleCountrySelect} />
      </div>

      {/* Nombre del país seleccionado */}
      {countryName && <p>📍 País seleccionado: {countryName}</p>}

      {/* Buscador de canales */}
      <input
        type="text"
        placeholder="🔍 Buscar canal..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="searchInput"
      />

      {/* Estado de carga */}
      {status && <p>{status}</p>}

      {/* Reproductor de video */}
      {streamUrl && <Player streamUrl={streamUrl} />}

      {/* Lista de canales */}
      {filteredChannels.length > 0 && (
        <ChannelSelector
          channels={filteredChannels}
          onSelect={setStreamUrl}
          onFavorite={toggleFavorite}
          favorites={favorites}
        />
      )}

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
    </div>
  );
}

export default App;