import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";
import type { TooltipProps } from "recharts";

const data = [
  { day: "", sessionLength: 30 },
  { day: "L", sessionLength: 30 },
  { day: "M", sessionLength: 40 },
  { day: "M", sessionLength: 50 },
  { day: "J", sessionLength: 30 },
  { day: "V", sessionLength: 30 },
  { day: "S", sessionLength: 50 },
  { day: "D", sessionLength: 50 },
  { day: "L", sessionLength: 30 },
  { day: "M", sessionLength: 40 },
  { day: "M", sessionLength: 50 },
  { day: "J", sessionLength: 30 },
  { day: "V", sessionLength: 30 },
  { day: "S", sessionLength: 50 },
  { day: "D", sessionLength: 50 },
];

export default function Linechart() {
  // Legend custom
  const CustomLegend = () => (
    <div
      style={{ color: "#FFF8", fontSize: 14, fontWeight: 800, paddingLeft: 20 }}
    >
      Durée moyenne des <br /> sessions
    </div>
  );
  //   Tooltip custom pour afficher la durée au survol sur le graph
  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;
      const label = payload[0].payload.day;

      if (!label) return null;

      return (
        <div
          style={{ background: "#FFF", padding: "4px 8px", borderRadius: 4 }}
        >
          <p style={{ margin: 0, color: "#000", fontSize: 12 }}>{value} min</p>
        </div>
      );
    }
    return null;
  };

  //   ActiveDot non visible sur le premier élément
  const customActiveDot = (props: any) => {
    const { cx, cy, r = 4, index } = props;
    // Hide the first dot by rendering a transparent circle with radius 0
    if (index === 0 || cx === undefined || cy === undefined) {
      return (
        <circle
          cx={cx ?? 0}
          cy={cy ?? 0}
          r={0}
          fill="transparent"
          stroke="transparent"
        />
      );
    }
    return (
      <circle cx={cx} cy={cy} r={r} fill="#FFF" stroke="#FFF" strokeWidth={2} />
    );
  };

  return (
    <div
      style={{
        overflowX: "auto",
        backgroundColor: "#FF0000",
        width: 400,
        height: 300,
      }}
    >
      <div style={{ width: 300, height: 300 }}>
        <LineChart
          data={data}
          width={800}
          height={300}
          margin={{ top: 40, right: 0, bottom: 20, left: 0 }}
        >
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            stroke="#FFFa"
            interval={0}
            padding={{ left: 0, right: 70 }}
            tickFormatter={(day) => (day ? day : "")}
          />
          <YAxis hide />
          <Tooltip content={<CustomTooltip />} cursor={false} />
          <Legend verticalAlign="top" align="left" content={<CustomLegend />} />
          <Line
            dataKey="sessionLength"
            stroke="#FFFa"
            strokeWidth={4}
            activeDot={customActiveDot}
            dot={false}
            type="natural"
          />
        </LineChart>
      </div>
    </div>
  );
}
