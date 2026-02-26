export type ChartPoint = {
  label: string;
  value: number;
};

export const engagementData: ChartPoint[] = [
  { label: "Week 1", value: 54 },
  { label: "Week 2", value: 60 },
  { label: "Week 3", value: 68 },
  { label: "Week 4", value: 75 },
  { label: "Week 5", value: 81 },
  { label: "Week 6", value: 87 }
];

export const scoreData: ChartPoint[] = [
  { label: "Week 1", value: 48 },
  { label: "Week 2", value: 60 },
  { label: "Week 3", value: 72 },
  { label: "Week 4", value: 82 }
];

export const accuracyData: ChartPoint[] = [
  { label: "Epoch 1", value: 0.65 },
  { label: "Epoch 2", value: 0.72 },
  { label: "Epoch 3", value: 0.8 },
  { label: "Epoch 4", value: 0.86 },
  { label: "Epoch 5", value: 0.89 },
  { label: "Epoch 6", value: 0.91 }
];

export const lossData: ChartPoint[] = [
  { label: "Epoch 1", value: 0.82 },
  { label: "Epoch 2", value: 0.68 },
  { label: "Epoch 3", value: 0.55 },
  { label: "Epoch 4", value: 0.46 },
  { label: "Epoch 5", value: 0.39 },
  { label: "Epoch 6", value: 0.35 }
];
