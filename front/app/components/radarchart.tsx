import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

type PerformanceData = {
  data: { value: number; kind: number }[];
  kind: { [key: number]: string };
};

export default function SimpleRadarChart({ performance }: { performance: PerformanceData }) {
  return (
    <div
      style={{
        width: 350,
        height: 250,
        borderRadius: 5,
      }}
    >
      <ResponsiveContainer className="bg-[#282D30] flex-1">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={performance.data}>
          <PolarGrid stroke="#FFF" />
          <PolarAngleAxis
            tick={{ dy: 5 }}
            tickLine={false}
            dataKey="kind"
            stroke="#FFF"
            tickFormatter={(kind) => {
              const labels: { [key: number]: string } = {
                1: 'Cardio',
                2: 'Énergie',
                3: 'Endurance',
                4: 'Force',
                5: 'Vitesse',
                6: 'Intensité',
              };
              return labels[kind] || kind;
            }}
          />
          <Radar name="Performance" dataKey="value" stroke="#FF0101B2" fill="#FF0101B2" fillOpacity={0.9} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
