import { MapContainer, TileLayer, GeoJSON, LayersControl as LeafletLayersControl } from "react-leaflet";
import { useState, useEffect } from "react";
import axios from "axios";
import LayersControl from "./LayersControl"; // Import komponen LayersControl

const GeoJSONMap = () => {
  const [geoData, setGeoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeLayers, setActiveLayers] = useState([]); // Track active layers

  const earthPalette = [
    "#5D3A1A", "#A6825D", "#C4AE78", "#8A9A5B", "#4A6A5A",
    "#D1B894", "#726255", "#9C7651", "#687864", "#BDA27F"
  ];  

  const tileLayers = [
    {
      name: "Dark Mode",
      url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      attribution: "© OpenStreetMap contributors & CARTO",
    },
    {
      name: "Light Mode",
      url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      attribution: "© OpenStreetMap contributors & CARTO",
    },
    {
      name: "Satellite",
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      attribution: "Tiles © Esri — Source: Esri, Maxar, Earthstar Geographics",
    },
  ];

  useEffect(() => {
    setLoading(true);
    axios.get(`${import.meta.env.VITE_APP_API_GEO}`)
      .then(response => {
        setGeoData(response.data);
        setLoading(false);
        setActiveLayers(response.data.map(geo => geo.name));
      })
      .catch(error => {
        console.error('Error fetching geojson:', error);
        setLoading(false);
      });
  }, []);

  const toggleLayer = (layerName) => {
    setActiveLayers((prev) =>
      prev.includes(layerName)
        ? prev.filter((name) => name !== layerName)
        : [...prev, layerName]
    );
  };

  const getGeoJSONStyle = (index) => ({
    color: earthPalette[index % earthPalette.length],
    weight: 2,
    fillOpacity: 0.2,
  });

  const getGeoJSONHover = (index) => ({
    color: earthPalette[index % earthPalette.length],
    weight: 5,
    fillOpacity: 0.8,
  });

  return (
    <div className="relative">
        <LayersControl
          geoData={geoData}
          activeLayers={activeLayers}
          toggleLayer={toggleLayer}
        />
      {loading ? (
        <div style={{ textAlign: "center", padding: "20px" }}>Memuat data...</div>
      ) : (
        <MapContainer
          center={[0.7047498986879579, 122.43409669232882]}
          zoom={10}
          className="h-screen z-10"
        >
          <LeafletLayersControl position="topright">
            {tileLayers.map((tile, index) => (
              <LeafletLayersControl.BaseLayer
                key={index}
                name={tile.name}
                checked={index === 0}
              >
                <TileLayer url={tile.url} attribution={tile.attribution} />
              </LeafletLayersControl.BaseLayer>
            ))}

            {geoData.map((geojson, index) =>
              activeLayers.includes(geojson.name) && (
                <GeoJSON
                  key={index}
                  data={geojson}
                  style={() => getGeoJSONStyle(index)}
                  onEachFeature={(feature, layer) => {
                    if (feature.properties && feature.properties.NAMOBJ) {
                      layer.bindPopup(
                        `<div><strong>${feature.properties.NAMOBJ}</strong></div><br><div>Luas : ${feature.properties.LUAS}</div>`
                      );
                    }
                    layer.on({
                      mouseover: (e) => {
                        const targetLayer = e.target;
                        targetLayer.setStyle(getGeoJSONHover(index));
                      },
                      mouseout: (e) => {
                        const targetLayer = e.target;
                        targetLayer.setStyle(getGeoJSONStyle(index));
                      },
                    });
                  }}
                />
              )
            )}
          </LeafletLayersControl>
        </MapContainer>
      )}
    </div>
  );
};

export default GeoJSONMap;
