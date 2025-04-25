import { useEffect, useState } from 'react';
import Player from './Player';
import { fetchChannelsByCountry } from '../services/iptvService';

export default function CanalDefecto() {
  const [latinaUrl, setLatinaUrl] = useState('');

  useEffect(() => {
    const loadLatina = async () => {
      try {
        const channels = await fetchChannelsByCountry('pe'); // Código ISO de Perú
        const latina = channels.find(channel => channel.name.toLowerCase().includes('latina'));
        if (latina) {
          setLatinaUrl(latina.url);
        }
      } catch (error) {
        console.error('Error al cargar canal Latina:', error);
      }
    };

    loadLatina();
  }, []);

  return (
    <>
      {latinaUrl && <Player streamUrl={latinaUrl} />}
    </>
  );
}
