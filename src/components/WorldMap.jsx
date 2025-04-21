import React, { useRef, useEffect, useState } from 'react';
import Globe from 'react-globe.gl';
import * as topojson from 'topojson-client';
import { countryIdToCode } from '../data/countriesMap';
import { countries } from '../data/countries';

const colorPalette = [
  '#f94144', '#f3722c', '#f8961e', '#f9844a',
  '#f9c74f', '#90be6d', '#43aa8b', '#4d908e',
  '#577590', '#277da1', '#9b5de5', '#f15bb5',
  '#00bbf9', '#00f5d4'
];

const getColorByCode = (code) => {
  const index = countries.findIndex(c => c.code === code);
  return colorPalette[index % colorPalette.length] || 'rgba(200, 0, 200, 0.6)';
};

export default function WorldMap({ onCountryClick }) {
  const globeEl = useRef();
  const [polygons, setPolygons] = useState([]);
  const [hoverD, setHoverD] = useState();

  useEffect(() => {
    fetch('https://unpkg.com/world-atlas@2/countries-110m.json')
      .then((res) => res.json())
      .then((topology) => {
        const countries = topojson.feature(topology, topology.objects.countries).features;
        setPolygons(countries);

        // Centramos la vista inicial del globo
        setTimeout(() => {
          globeEl.current.pointOfView({ lat: 0, lng: 0, altitude: 2 }, 1000);
        }, 500); // Delay para asegurar que el globo esté montado
      })
      .catch((err) => console.error('Error cargando países:', err));
  }, []);

  return (
    <div className='globomundi'>
      <Globe
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundColor="#000"
        showGraticules={true}
        polygonsData={polygons}
        polygonAltitude={(d) => (d === hoverD ? 0.12 : 0.06)}
        polygonCapColor={(d) => {
          const id = d.id;
          const code = countryIdToCode[id];
          return code ? getColorByCode(code) : 'rgba(80, 80, 80, 0.3)';
        }}
        polygonSideColor={() => 'rgba(0, 0, 0, 0.15)'}
        polygonStrokeColor={(d) =>
          d === hoverD ? '#fff' : '#222'
        }
        onPolygonHover={setHoverD}
        onPolygonClick={(polygon) => {
          const id = polygon.id;
          const code = countryIdToCode[id];
          if (code) {
            const country = countries.find(c => c.code === code);
            if (country) {
              onCountryClick(code, country.name);

              // Centra la cámara sobre el país seleccionado
              if (polygon.centroid) {
                globeEl.current.pointOfView({
                  lat: polygon.centroid[1],
                  lng: polygon.centroid[0],
                  altitude: 1.5
                }, 1000);
              }
            }
          }
        }}
      />
    </div>
  );
}
