import { useState, useEffect } from 'react';
import CountrySelector from './components/CountrySelector';
import ChannelSelector from './components/ChannelSelector';
import Player from './components/Player';
import WorldMap from './components/WorldMap'; // Importa el nuevo componente
import { fetchChannelsByCountry } from './services/iptvService';
import './App.css';
import Footer from './components/shared/Footer';

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
      <div className='nav_code'>

        <p> <a href="http://compilandocode.com" target="_blank" rel="noopener noreferrer"> Compilandocode</a> y <a href="http://emersonespinoza.com" target="_blank" rel="noopener noreferrer">Emerson Espinoza </a> te ayuda a ver </p>
        <h1>🌍 TV en Vivo por País</h1>
      </div>

      {/* Selector de país */}
      <CountrySelector selected={country} onChange={setCountry} />

      {/* Mapa mundial */}
      <div className='map-container'>

        <p>Selecciona un país en el mapa para ver sus canales</p>
        <WorldMap onCountryClick={handleCountrySelect} />

      </div>

      {/* Nombre del país seleccionado */}
      {countryName && <p>📍 País seleccionado: {countryName}</p>}



      {/* Estado de carga */}
      {status && <p>{status}</p>}

      <div className='main-video-lista'>
        {/* Reproductor de video */}
        <div className='videoPlayer'>

          {streamUrl && <Player streamUrl={streamUrl} />}
        </div>
        {/* Lista de canales */}
        <div className='listaCanales'>
          {/* Buscador de canales */}
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

      {/* Créditos */}
    </div>
  );
}

export default App;