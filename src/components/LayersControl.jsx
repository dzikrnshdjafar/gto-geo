import { motion } from "framer-motion";
import { useState } from "react";

const LayersControl = ({ geoData, activeLayers, toggleLayer }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  return (
    <motion.div
      className="absolute h-[55rem] top-3 right-3 z-20 shadow-lg rounded-xl bg-emerald-200 overflow-hidden"
      initial={{ width: "16rem" }} // Default width
      animate={{ width: isCollapsed ? "3rem" : "16rem" }} // Animasi collapse
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="flex items-center justify-between p-4 cursor-pointer">
        <h2 className={`text-xl font-semibold ${isCollapsed ? "hidden" : ""}`}>
          Layers Control
        </h2>
        <button
          className="text-gray-700"
          onClick={toggleCollapse}
        >
          {isCollapsed ? "⯈" : "⯆"}
        </button>
      </div>
      {!isCollapsed && (
        <motion.ul
          className="space-y-3 px-4 pb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {geoData.map((geojson, index) => (
            <li key={index}>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={activeLayers.includes(geojson.name)}
                  onChange={() => toggleLayer(geojson.name)}
                  className="form-checkbox text-blue-500"
                />
                <span>{geojson.name}</span>
              </label>
            </li>
          ))}
        </motion.ul>
      )}
    </motion.div>
  );
};

export default LayersControl;