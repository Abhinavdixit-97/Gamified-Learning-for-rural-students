import { useTranslation } from "react-i18next";
import Section from "../components/Section";
import {
  engagementData,
  scoreData,
  accuracyData,
  lossData
} from "../data/resultsData";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const makeSeries = (label: string, data: number[], color: string) => ({
  label,
  data,
  borderColor: color,
  backgroundColor: "rgba(0,0,0,0)",
  tension: 0.35,
  pointRadius: 4
});

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    y: {
      beginAtZero: true
    }
  }
};

const Results = () => {
  const { t } = useTranslation();
  const cards = t("results.cards", { returnObjects: true }) as Array<{
    title: string;
    text: string;
  }>;

  return (
    <Section title={t("results.title")}>
      <p>{t("results.lead")}</p>
      <div className="card-grid">
        {cards.map((card) => (
          <div className="card" key={card.title}>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </div>
        ))}
      </div>

      <div className="section">
        <div className="card-grid">
          <div className="chart-card">
            <h3>{t("results.charts.engagement")}</h3>
            <Line
              options={chartOptions}
              data={{
                labels: engagementData.map((point) => point.label),
                datasets: [
                  makeSeries(
                    "Engagement",
                    engagementData.map((point) => point.value),
                    "#43aa8b"
                  )
                ]
              }}
            />
          </div>
          <div className="chart-card">
            <h3>{t("results.charts.scores")}</h3>
            <Line
              options={chartOptions}
              data={{
                labels: scoreData.map((point) => point.label),
                datasets: [
                  makeSeries(
                    "Scores",
                    scoreData.map((point) => point.value),
                    "#f8961e"
                  )
                ]
              }}
            />
          </div>
          <div className="chart-card">
            <h3>{t("results.charts.accuracy")}</h3>
            <Line
              options={chartOptions}
              data={{
                labels: accuracyData.map((point) => point.label),
                datasets: [
                  makeSeries(
                    "Accuracy",
                    accuracyData.map((point) => point.value),
                    "#4cc9f0"
                  ),
                  makeSeries(
                    "Loss",
                    lossData.map((point) => point.value),
                    "#f3722c"
                  )
                ]
              }}
            />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Results;
