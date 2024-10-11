import { MapContainer, TileLayer, GeoJSON, Popup, LayersControl } from 'react-leaflet';
import { useState, useEffect } from 'react';
import axios from 'axios';

const GeoJSONMap = () => {
  const [geoData, setGeoData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Array color GeoJSON
  const earthPalette = [
    "#5D3A1A", // Deep Earth Brown
    "#A6825D", // Warm Sandstone
    "#C4AE78", // Golden Sand
    "#8A9A5B", // Moss Green
    "#4A6A5A", // Pine Forest Green
    "#D1B894", // Soft Clay
    "#726255", // Stone Gray
    "#9C7651", // Dried Earth
    "#687864", // Sagebrush Green
    "#BDA27F"  // Desert Beige
  ];  

  useEffect(() => {
    // Fetch all GeoJSON
    setLoading(true);
    axios.get(`${import.meta.env.VITE_APP_API_GEO}`)
      .then(response => {
        setGeoData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching geojson:', error);
        setLoading(false);
      });
  }, []);

  // Function for geoJSON color
  const getGeoJSONStyle = (index) => {
    return {
      color: earthPalette[index % earthPalette.length], 
      weight: 2,
      fillOpacity : 0.2
    };
  };
  // Function for geoJSON hover
  const getGeoJSONHover = (index) => {
    return {
      color: earthPalette[index % earthPalette.length], 
      weight: 5,
      fillOpacity: 0.8
    };
  };

  return (
    <>
      {loading ? (
        <div style={{ textAlign: 'center', padding: '20px' }}>Memuat data...</div>
      ) : (
        <MapContainer center={[0.7047498986879579, 122.43409669232882]} zoom={9} style={{ height: '500px', width: '100%' }}>
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution="Tiles © Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
          />
          <LayersControl position="topright">
            {geoData.map((geojson, index) => (
              <LayersControl.Overlay 
                key={index} 
                name={geojson.name} 
                checked 
              >
                <GeoJSON
                  data={geojson}
                  style={() => getGeoJSONStyle(index)}
                  onEachFeature={(feature, layer) => {
                    if (feature.properties && feature.properties.NAMOBJ) {
                      layer.bindPopup(`<div><strong>${feature.properties.NAMOBJ}</strong></div>`);
                    }

                    // styling geoJSON hover
                    layer.on({
                      mouseover: (e) => {
                        const targetLayer = e.target;
                        targetLayer.setStyle(getGeoJSONHover(index));
                      },
                      mouseout: (e) => {
                        const targetLayer = e.target;
                        targetLayer.setStyle(getGeoJSONStyle(index));
                      }
                    });
                  }}
                />
              </LayersControl.Overlay>
            ))}
          </LayersControl>
        </MapContainer>
      )}
    </>
  );
};

export default GeoJSONMap;
