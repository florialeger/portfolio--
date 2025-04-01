import React from 'react';
import { motion } from 'framer-motion';
import './CrossIcon.css';

const CrossIcon = ({ onClick }) => (
  <div className="global-cross-icon" onClick={onClick}>
    <motion.div
      className="global-cross-icon-bar"
      initial={{ opacity: 0, display: "flex", justifyContent: "center" }}
      animate={{ opacity: 1, rotate: 45, y: 2, x: 1 }}
      transition={{ duration: 0.1 }}
    />
    <motion.div
      className="global-cross-icon-bar"
      initial={{ opacity: 0, display: "flex", justifyContent: "center" }}
      animate={{ opacity: 1, rotate: -50, y: -2, x: 0 }}
      transition={{ duration: 0.1 }}
    />
  </div>
);

export default CrossIcon;