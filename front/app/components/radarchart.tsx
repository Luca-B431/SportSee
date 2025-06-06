import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

const data = [
  { kind: "Cardio", value: 80 },
  { kind: "Energie", value: 120 },
  { kind: "Endurance", value: 140 },
  { kind: "Force", value: 50 },
  { kind: "Vitesse", value: 200 },
  { kind: "Intensité", value: 90 },
];

export default function SimpleRadarChart() {
  return (
    <div
      style={{
        width: 350,
        height: 300,
        borderRadius: 5,
      }}
    >
      <ResponsiveContainer className="bg-[#282D30] flex-1">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#FFF" />
          <PolarAngleAxis dataKey="kind" />
          <Radar
            name="Mike"
            dataKey="value"
            stroke="#FF0101B2"
            fill="#FF0101B2"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
