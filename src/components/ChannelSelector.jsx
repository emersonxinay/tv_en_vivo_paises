import '../assets/ChannelSelector.css';

export default function ChannelSelector({ channels, onSelect, onFavorite, favorites }) {
  const handleSelectChange = (e) => {
    const url = e.target.value;
    if (!url) return;
    onSelect(url);
  };

  return (
    <div className="channel-selector">
      {/* Dropdown select */}
      <select onChange={handleSelectChange} className="channel-select">
        <option value="">📺 Selecciona un canal</option>
        {channels.map((channel, index) => (
          <option key={index} value={channel.url}>
            {favorites?.some(f => f.url === channel.url) ? '⭐ ' : ''}{channel.name}
          </option>
        ))}
      </select>

      {/* Lista de canales con botones */}
      <div className="channel-list">
        {channels.map((channel, index) => {
          const isFav = favorites?.some(fav => fav.url === channel.url);
          return (
            <div key={index} className="channel-card">
              <span>{isFav ? '⭐ ' : ''}{channel.name}</span>
              <div className="channel-buttons">
                <button onClick={() => onSelect(channel.url)}>▶️ Ver</button>
                <button onClick={() => onFavorite(channel)}>
                  {isFav ? '💔 Quitar' : '⭐ Favorito'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
