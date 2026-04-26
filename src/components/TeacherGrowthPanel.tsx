import { useTranslation } from "react-i18next";
import type { Attempt } from "../data/analytics";
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

type TeacherGrowthPanelProps = {
  attempts: Attempt[];
};

const accuracy = (list: Attempt[]) => {
  if (!list.length) return 0;
  const correct = list.filter((item) => item.correct).length;
  return Math.round((correct / list.length) * 100);
};

const TeacherGrowthPanel = ({ attempts }: TeacherGrowthPanelProps) => {
  const { t } = useTranslation();
  const total = attempts.length;
  const overallAccuracy = accuracy(attempts);
  const avgTime =
    total === 0
      ? 0
      : Math.round(
          attempts.reduce((sum, item) => sum + (item.timeSpentSec || 0), 0) / total
        );

  const lastFive = attempts.slice(-5);
  const prevFive = attempts.slice(-10, -5);
  const growth =
    lastFive.length >= 3 && prevFive.length >= 3
      ? accuracy(lastFive) - accuracy(prevFive)
      : null;

  const recent = attempts.slice(-12);
  let runningCorrect = 0;
  const trend = recent.map((item, index) => {
    if (item.correct) runningCorrect += 1;
    return Math.round((runningCorrect / (index + 1)) * 100);
  });

  const chartData = {
    labels: recent.map((_item, index) => `#${attempts.length - recent.length + index + 1}`),
    datasets: [
      {
        label: "Accuracy",
        data: trend,
        borderColor: "#2FA4D7",
        backgroundColor: "rgba(47, 164, 215, 0.2)",
        tension: 0.35,
        pointRadius: 4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true, max: 100 } }
  };

  return (
    <>
      <div className="card">
        <h3>{t("tutor.growthTitle")}</h3>
        <p>{t("tutor.growthNote")}</p>
        <div className="stat-row">
          <span className="stat-pill">
            {t("tutor.attempts")}: {total}
          </span>
          <span className="stat-pill">
            {t("tutor.overallAccuracy")}: {overallAccuracy}%
          </span>
          <span className="stat-pill">
            {t("tutor.avgTime")}: {avgTime} {t("tutor.timeUnit")}
          </span>
          <span className="stat-pill">
            {t("tutor.growth")}:{" "}
            {growth === null ? t("tutor.noData") : `${growth > 0 ? "+" : ""}${growth}%`}
          </span>
        </div>
      </div>
      <div className="chart-card">
        <h3>{t("tutor.growthChartTitle")}</h3>
        {recent.length ? <Line data={chartData} options={chartOptions} /> : <p>{t("tutor.noData")}</p>}
      </div>
    </>
  );
};

export default TeacherGrowthPanel;
