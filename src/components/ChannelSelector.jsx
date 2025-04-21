export default function ChannelSelector({ channels, onSelect }) {
  return (
    <select onChange={(e) => onSelect(e.target.value)}>
      <option value="">📺 Selecciona un canal</option>
      {channels.map((c, i) => (
        <option key={i} value={c.url}>{c.name}</option>
      ))}
    </select>
  );
}
