import React from "react";

type PageHeroProps = {
  badge?: string;
  title: string;
  subtitle: string;
  actions?: React.ReactNode;
  sideTitle?: string;
  sideText?: string;
  pills?: string[];
};

const PageHero = ({
  badge,
  title,
  subtitle,
  actions,
  sideTitle,
  sideText,
  pills
}: PageHeroProps) => {
  return (
    <div className="hero container fade-in">
      <div>
        {badge ? <span className="badge">{badge}</span> : null}
        <h1>{title}</h1>
        <p>{subtitle}</p>
        {actions ? <div className="hero-actions">{actions}</div> : null}
      </div>
      <div className="hero-card">
        <h3>{sideTitle || "Learning feels like an adventure"}</h3>
        <p>
          {sideText ||
            "Students earn stars, unlock badges, and move through levels while learning real skills for life."}
        </p>
        <div className="stat-row">
          {(pills || ["Offline-first", "AI support", "Community impact"]).map((pill) => (
            <span key={pill} className="stat-pill">
              {pill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageHero;
