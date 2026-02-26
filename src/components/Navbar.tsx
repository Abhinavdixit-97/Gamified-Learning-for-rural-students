import type { ChangeEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { navItems } from "../data/navigation";
import { languageOptions } from "../data/languages";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const next = event.target.value;
    i18n.changeLanguage(next);
    localStorage.setItem("language", next);
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="brand">
          <span className="brand-dot" />
          <span>Rural Learn Quest</span>
        </div>
        <div className="nav-links">
          {navItems.map((item) => (
            <Link
              key={item.key}
              to={item.path}
              className={`nav-link${location.pathname === item.path ? " active" : ""}`}
            >
              {t(item.key)}
            </Link>
          ))}
        </div>
        <div className="nav-actions">
          <select
            className="language-select"
            value={i18n.language}
            onChange={handleLanguageChange}
          >
            {languageOptions.map((language) => (
              <option key={language.code} value={language.code}>
                {language.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
