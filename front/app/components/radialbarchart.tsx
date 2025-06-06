import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  Legend,
} from "recharts";

const scores = [
  { score: 0.2 },
  { score: 0.1 },
  { score: 0.12 },
  { score: 0.1 },
  { score: 0.1 },
  { score: 0.1 },
  { score: 0.1 },
];

export default function SimpleRadialBarChart() {
  const average =
    scores.reduce((sum, item) => sum + item.score, 0) / scores.length;
  const data = [{ name: "Average", value: average * 100 }];
  const percentage = data[0].value;

  return (
    <div className="relative w-[250px] h-[250px] bg-[#FBFBFB] rounded-sm">
      <svg
        width="300"
        height="300"
        className="absolute top-0 left-0"
        style={{ transform: "translate(25px, 15px)" }}
      >
        <circle
          cx="100"
          cy="108"
          r="74"
          stroke="#e5e7eb"
          strokeWidth="10"
          fill="none"
        />
      </svg>

      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          data={data}
          width={300}
          className="flex-1"
          cx="50%"
          cy="52%"
          innerRadius="82%"
          outerRadius="100%"
          barSize={10}
          startAngle={90}
          endAngle={90 + (percentage / 100) * 360}
        >
          <RadialBar
            dataKey="value"
            fill="#ff0000"
            background
            cornerRadius={10}
          />
          <Legend
            iconSize={0}
            verticalAlign="top"
            align="left"
            wrapperStyle={{
              paddingLeft: 20,
              paddingTop: 20,
              fontSize: "14px",
              color: "#000",
            }}
            formatter={(value) => "Score"}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-xl font-bold">
        {Math.round(data[0].value)}% <br />{" "}
        <span className="text-sm text-[#74798C]">
          de <br />
          votre objectif
        </span>
      </div>
    </div>
  );
}
