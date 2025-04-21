import '../assets/CountrySelector.css';
import { countries } from '../data/countries';

export default function CountrySelector({ selected, onChange }) {
  return (
    <div className="country-selector-container">
      <select
        className="country-select"
        value={selected}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">🌎 Selecciona un país</option>
        {countries.map((c) => (
          <option key={c.code} value={c.code}>
            {c.name}
          </option>
        ))}
      </select>
    </div>
  );
}
