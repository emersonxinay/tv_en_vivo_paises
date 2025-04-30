import '../assets/ChannelSelector.css';
import { useEffect } from 'react';

export default function ChannelSelector({
  channels,
  onSelect,
  onFavorite,
  favorites,
  selectedUrl
}) {
  const handleSelectChange = (e) => {
    const url = e.target.value;
    if (!url) return;
    onSelect(url);
  };

  useEffect(() => {
    if (channels?.length > 0) {
      console.log('📺 Lista de canales disponibles:');
      console.table(channels.map(c => ({ Nombre: c.name, URL: c.url, Logo: c.logo })));
    }
  }, [channels]);

  return (
    <div className="channel-selector">
      <select onChange={handleSelectChange} className="channel-select">
        <option value="">📺 Selecciona un canal</option>
        {channels.map((channel, index) => (
          <option key={index} value={channel.url}>
            {favorites?.some(f => f.url === channel.url) ? '⭐ ' : ''}{channel.name}
          </option>
        ))}
      </select>

      <div className="channel-list">
        {channels.map((channel, index) => {
          const isFav = favorites?.some(fav => fav.url === channel.url);
          const isSelected = channel.url === selectedUrl;
          return (
            <div
              key={index}
              className={`channel-card ${isSelected ? 'selected-channel' : ''}`}
              onClick={() => onSelect(channel.url)}
            >
              <img
                src={channel.logo || '/default-logo.png'}
                alt={`${channel.name} logo`}
                className="channel-logo"
              />

              <div className="channel-info">
                <span className="channel-name">
                  {isFav ? '⭐ ' : ''}
                  {channel.name}
                </span>

                <div className="channel-buttons">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelect(channel.url);
                    }}
                  >
                    ▶️ Ver
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onFavorite(channel);
                    }}
                  >
                    {isFav ? '💔 Quitar' : '⭐ Favorito'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
