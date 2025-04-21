export async function fetchChannelsByCountry(countryCode) {
  const url = `https://iptv-org.github.io/iptv/countries/${countryCode}.m3u`;
  const res = await fetch(url);
  const text = await res.text();
  const lines = text.split('\n');
  const channels = [];

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('#EXTINF')) {
      const name = lines[i].split(',')[1];
      const streamUrl = lines[i + 1];
      channels.push({ name, url: streamUrl });
    }
  }

  return channels;
}
