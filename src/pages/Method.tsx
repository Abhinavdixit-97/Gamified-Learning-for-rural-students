import { useTranslation } from "react-i18next";
import Section from "../components/Section";

const Method = () => {
  const { t } = useTranslation();
  const steps = t("method.steps", { returnObjects: true }) as Array<{
    title: string;
    text: string;
  }>;

  return (
    <Section title={t("method.title")}>
      <p>{t("method.lead")}</p>
      <div className="card-grid">
        {steps.map((step) => (
          <div className="card" key={step.title}>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Method;
