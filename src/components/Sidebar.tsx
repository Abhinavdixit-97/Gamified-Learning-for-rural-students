import { motion } from "framer-motion";
import { useState } from "react";
import "../styles/sidebar.css";

type SidebarProps = {
  onNavigate: (section: string) => void;
  activeSection: string;
};

const menuItems = [
  { id: "dashboard", icon: "📊", label: "Dashboard" },
  { id: "students", icon: "👨🎓", label: "Students" },
  { id: "content", icon: "📚", label: "Content" },
  { id: "assignments", icon: "📝", label: "Assignments" },
  { id: "analytics", icon: "📈", label: "Analytics" },
  { id: "settings", icon: "⚙️", label: "Settings" }
];

const Sidebar = ({ onNavigate, activeSection }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside 
      className={`sidebar ${collapsed ? "collapsed" : ""}`}
      initial={{ x: -100 }}
      animate={{ x: 0, width: collapsed ? "80px" : "240px" }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <motion.button 
        className="sidebar-toggle"
        onClick={() => setCollapsed(!collapsed)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {collapsed ? "→" : "←"}
      </motion.button>

      <div className="sidebar-menu">
        {menuItems.map((item) => (
          <motion.button
            key={item.id}
            className={`sidebar-item ${activeSection === item.id ? "active" : ""}`}
            onClick={() => onNavigate(item.id)}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span 
              className="sidebar-icon"
              animate={{ rotate: activeSection === item.id ? [0, 10, -10, 0] : 0 }}
              transition={{ duration: 0.5 }}
            >
              {item.icon}
            </motion.span>
            {!collapsed && <span className="sidebar-label">{item.label}</span>}
            {activeSection === item.id && (
              <motion.div 
                className="active-indicator"
                layoutId="activeIndicator"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </motion.aside>
  );
};

export default Sidebar;
