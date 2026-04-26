import { motion } from "framer-motion";
import "../styles/skeleton.css";

export const SkeletonCard = () => (
  <motion.div className="skeleton-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
    <div className="skeleton-line skeleton-title" />
    <div className="skeleton-line skeleton-text" />
    <div className="skeleton-line skeleton-text short" />
  </motion.div>
);

export const SkeletonStat = () => (
  <motion.div className="skeleton-stat" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
    <div className="skeleton-circle" />
    <div className="skeleton-line skeleton-number" />
    <div className="skeleton-line skeleton-label" />
  </motion.div>
);
