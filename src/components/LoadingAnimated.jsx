import React from "react";
import { motion } from "framer-motion";

const LoadingAnimated = () => {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [0, -10, 0] }}
      transition={{
        duration: 1.5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
      }}
    >
      <svg
        className="animated-svg"
        xmlns="http://www.w3.org/2000/svg"
        width="200"
        height="200"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#a7f3d0"
      >
        <path
          d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4m7-4v16m8-12v16"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
};

export default LoadingAnimated;
