import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PageHero from "../components/PageHero";
import Section from "../components/Section";

const Home = () => {
  const { t } = useTranslation();
  const impactCards = t("home.impactCards", { returnObjects: true }) as Array<{
    title: string;
    text: string;
  }>;
  const howCards = t("home.howCards", { returnObjects: true }) as Array<{
    title: string;
    text: string;
  }>;

  return (
    <>
      <PageHero
        badge={t("home.badge")}
        title={t("home.title")}
        subtitle={t("home.subtitle")}
        sideTitle={t("home.heroCardTitle")}
        sideText={t("home.heroCardText")}
        pills={t("home.heroPills", { returnObjects: true }) as string[]}
        actions={
          <>
            <Link className="btn btn-primary" to="/solution">
              {t("home.ctaPrimary")}
            </Link>
            <Link className="btn btn-secondary" to="/results">
              {t("home.ctaSecondary")}
            </Link>
          </>
        }
      />

      <Section>
        <div className="stat-row">
          <span className="stat-pill">{t("home.stats.students")}</span>
          <span className="stat-pill">{t("home.stats.engagement")}</span>
          <span className="stat-pill">{t("home.stats.scores")}</span>
        </div>
      </Section>

      <Section title={t("home.impactTitle")}>
        <p>{t("home.impactDescription")}</p>
        <div className="card-grid">
          {impactCards.map((card) => (
            <div className="card" key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title={t("home.howTitle")}>
        <div className="card-grid">
          {howCards.map((card) => (
            <div className="card" key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
};

export default Home;
