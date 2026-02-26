import { useTranslation } from "react-i18next";
import Section from "../components/Section";

const Problem = () => {
  const { t } = useTranslation();
  const cards = t("problem.cards", { returnObjects: true }) as Array<{
    title: string;
    text: string;
  }>;

  return (
    <Section title={t("problem.title")}>
      <p>{t("problem.lead")}</p>
      <div className="card-grid">
        {cards.map((card) => (
          <div className="card" key={card.title}>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Problem;
