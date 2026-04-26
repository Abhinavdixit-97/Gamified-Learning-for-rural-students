import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import "../styles/toast.css";

type ToastProps = {
  message: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
  duration?: number;
};

const Toast = ({ message, type = "info", onClose, duration = 3000 }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: "✅",
    error: "❌",
    info: "ℹ️"
  };

  return (
    <motion.div
      className={`toast toast-${type}`}
      initial={{ opacity: 0, y: -50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.8 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <span className="toast-icon">{icons[type]}</span>
      <span className="toast-message">{message}</span>
      <motion.button 
        className="toast-close"
        onClick={onClose}
        whileHover={{ scale: 1.2, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
      >
        ×
      </motion.button>
    </motion.div>
  );
};

type ToastContainerProps = {
  toasts: Array<{ id: string; message: string; type?: "success" | "error" | "info" }>;
  onRemove: (id: string) => void;
};

export const ToastContainer = ({ toasts, onRemove }: ToastContainerProps) => (
  <div className="toast-container">
    <AnimatePresence>
      {toasts.map((toast) => (
        <Toast key={toast.id} message={toast.message} type={toast.type} onClose={() => onRemove(toast.id)} />
      ))}
    </AnimatePresence>
  </div>
);

export default Toast;
