import '../assets/ChannelSelector.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faPlay, faHeart } from '@fortawesome/free-solid-svg-icons';

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



  return (
    <div className="channel-selector">
      <select onChange={handleSelectChange} className="channel-select">
        <option value="">📺 Selecciona un canal</option>
        {channels.map((channel, index) => (
          <option key={index} value={channel.url}>
            {channel.name}
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
                  {isFav && <FontAwesomeIcon icon={faStar} className="channel-fav-icon" />} {channel.name}
                </span>

                <div className="channel-buttons">
                  <button
                    className="channel-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelect(channel.url);
                    }}
                  >
                    <FontAwesomeIcon icon={faPlay} /> Ver
                  </button>
                  <button
                    className="channel-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onFavorite(channel);
                    }}
                  >
                    <FontAwesomeIcon icon={isFav ? faHeart : faStar} /> {isFav ? 'Quitar' : 'Fav'}
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
