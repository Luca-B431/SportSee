import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

type ActivityData = {
  date: string;
  calories: number;
  kilogram: number;
};

export default function Barchart({ data }: { data: ActivityData[] }) {
  const poidsValues = data.map((d) => d.kilogram);
  const caloriesValues = data.map((d) => d.calories);

  const minPoids = Math.min(...poidsValues);
  const maxPoids = Math.max(...poidsValues);

  const minCalories = Math.min(...caloriesValues);
  const maxCalories = Math.max(...caloriesValues);
  const rightYAxisTicks = [minPoids, minPoids + (maxPoids - minPoids) / 2, maxPoids];

  return (
    <div className="bg-[#FBFBFB] p-4 rounded w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 0, right: 0, left: 20, bottom: -20 }} barGap={20}>
          <CartesianGrid horizontal={false} vertical={false} />
          <XAxis dataKey="formattedDataDays" tickLine={false} tickMargin={10} />
          <YAxis
            yAxisId="left"
            tick={false}
            tickLine={false}
            domain={[minCalories - 100, maxCalories + 100]}
            axisLine={false}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            padding={{ top: 30 }}
            axisLine={false}
            tickLine={false}
            domain={[minPoids - 1, maxPoids + 0.5]}
            ticks={[minPoids, minPoids + (maxPoids - minPoids) / 2, maxPoids]}
          />
          {rightYAxisTicks.map((tick) => (
            <ReferenceLine key={tick} y={tick} yAxisId="right" stroke="#d3d3d3" strokeDasharray="" />
          ))}
          <Bar dataKey="calories" fill="#E60000" yAxisId="left" barSize={10} radius={[10, 10, 0, 0]} />
          <Bar dataKey="kilogram" fill="#282D30" yAxisId="right" barSize={10} radius={[10, 10, 0, 0]} />
          <Tooltip
            cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
            formatter={(value, name) => {
              if (name === 'kilogram') return [`${value} kg`, 'Kilogrammes'];
              if (name === 'calories') return [`${value} kCal`, 'Calories brûlées'];
              return [value, name];
            }}
          />
          <Legend
            formatter={(value) => {
              switch (value) {
                case 'calories':
                  return 'Calories brûlées (kCal)';
                case 'kilogram':
                  return 'Poids (kg)';
                default:
                  return value;
              }
            }}
            verticalAlign="top"
            align="right"
            width={300}
            iconType="circle"
            iconSize={8}
            wrapperStyle={{
              backgroundColor: '#FBFBFB',
              borderRadius: 3,
              lineHeight: '40px',
            }}
          />
          <text x={20} y={30} fill="#20253A" fontSize={15} fontWeight="bold">
            Activité quotidienne
          </text>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
