import { useTranslation } from "react-i18next";

type BadgeMeterProps = {
  points: number;
  badges: string[];
};

const BadgeMeter = ({ points, badges }: BadgeMeterProps) => {
  const { t } = useTranslation();
  const goal = 100;
  const progress = Math.min((points / goal) * 100, 100);

  return (
    <div className="progress-meter">
      <div>
        <strong>{t("tutor.points")}</strong>
        <div className="muted">{points} / {goal}</div>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <div>
        <strong>{t("tutor.badges")}</strong>
        <div className="muted">{badges.join(", ") || "—"}</div>
      </div>
    </div>
  );
};

export default BadgeMeter;
