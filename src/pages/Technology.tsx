import { useTranslation } from "react-i18next";
import Section from "../components/Section";

const Technology = () => {
  const { t } = useTranslation();
  const stack = t("technology.stack", { returnObjects: true }) as Array<{
    title: string;
    text: string;
  }>;

  return (
    <Section title={t("technology.title")}>
      <p>{t("technology.lead")}</p>
      <div className="card-grid">
        {stack.map((card) => (
          <div className="card" key={card.title}>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Technology;
