import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <strong>Rural Learn Quest</strong>
          <div className="muted">{t("home.badge")}</div>
        </div>
        <div className="tag-list">
          <span className="tag">Offline-first</span>
          <span className="tag">AI Tutor</span>
          <span className="tag">Games for Good</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
