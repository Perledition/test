import { useContext } from 'react';
import { ChartDataContext } from '../countChart/ChartContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

export interface ChartElement {
  name: string;
  value: number;
}

interface EntityType {
  entity: string
}

export default function CountChart({ entity }: EntityType) {
  const { globalChartData } = useContext(ChartDataContext );
  let data: ChartElement[] = [];
  if (entity === "PER") {
    data = (globalChartData.PER as ChartElement[]);
  } else if(entity === "LOC") {
    data = (globalChartData.LOC as ChartElement[]);
  }
  return (
    <BarChart width={350} height={150} data={data} layout="vertical">
      <XAxis type="number" />
      <YAxis dataKey="name" type="category" />
      <Tooltip />
      <Bar dataKey="value" fill="#1976d2" />
    </BarChart>
  );
}
