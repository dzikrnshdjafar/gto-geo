import Card from "./components/Card";
import GeoJSONMap from "./components/GeoJSONMap";

function App() {
  return (
    <div className="p-4 min-h-screen bg-gradient-to-r from-gray-800">
      <Card title="Batas Adminstrasi Provinsi Gorontalo">
        <GeoJSONMap />
      </Card>
    </div>
  );
}

export default App;
