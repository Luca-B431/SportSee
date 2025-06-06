import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

const data = [
  {
    date: "1",
    id: 18,
    firstName: "Cecilia",
    lastName: "Ratorez",
    age: 34,
    score: 0.3,
    calories: 2500,
    proteinCount: 90,
    carbohydrateCount: 150,
    lipidCount: 120,
    poids: 70,
  },
  {
    date: "2",
    id: 18,
    firstName: "Cecilia",
    lastName: "Ratorez",
    age: 34,
    score: 0.5,
    calories: 2400,
    proteinCount: 85,
    carbohydrateCount: 160,
    lipidCount: 110,
    poids: 70.5,
  },
  {
    date: "3",
    id: 18,
    firstName: "Cecilia",
    lastName: "Ratorez",
    age: 34,
    score: 0.7,
    calories: 2300,
    proteinCount: 95,
    carbohydrateCount: 170,
    lipidCount: 100,
    poids: 71,
  },
  {
    date: "4",
    id: 18,
    firstName: "Cecilia",
    lastName: "Ratorez",
    age: 34,
    score: 0.9,
    calories: 2200,
    proteinCount: 100,
    carbohydrateCount: 180,
    lipidCount: 90,
    poids: 71.5,
  },
  {
    date: "5",
    id: 18,
    firstName: "Cecilia",
    lastName: "Ratorez",
    age: 34,
    score: 1.0,
    calories: 2100,
    proteinCount: 105,
    carbohydrateCount: 190,
    lipidCount: 80,
    poids: 72,
  },
  {
    date: "6",
    id: 18,
    firstName: "Cecilia",
    lastName: "Ratorez",
    age: 34,
    score: 1.2,
    calories: 2000,
    proteinCount: 110,
    carbohydrateCount: 200,
    lipidCount: 70,
    poids: 72.5,
  },
  {
    date: "7",
    id: 18,
    firstName: "Cecilia",
    lastName: "Ratorez",
    age: 34,
    score: 1.4,
    calories: 1900,
    proteinCount: 115,
    carbohydrateCount: 210,
    lipidCount: 60,
    poids: 73,
  },
];

export default function Barchart() {
  return (
    <ResponsiveContainer height={300} className="bg-[#f5f5f5] flex-1">
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        barGap={20}
      >
        <CartesianGrid horizontal={false} vertical={false} />
        <ReferenceLine y="71" stroke="#282D30" yAxisId="right" />
        <ReferenceLine y="73" stroke="#282D30" yAxisId="right" />
        <ReferenceLine y="2000" stroke="#E60000" yAxisId="left" />
        <XAxis dataKey="date" tickLine={false} tickMargin={10} />

        <YAxis
          yAxisId="left"
          tick={{ fill: "#E60000" }}
          ticks={["2000"]}
          axisLine={false}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          axisLine={false}
          tickLine={false}
          domain={[69, 73.5]}
          ticks={[69, 71, 73]}
        />

        <Bar
          dataKey="calories"
          fill="#E60000"
          yAxisId="left"
          barSize={10}
          radius={[10, 10, 0, 0]}
        />
        <Bar
          dataKey="poids"
          fill="#282D30"
          yAxisId="right"
          barSize={10}
          radius={[10, 10, 0, 0]}
        />
        <Tooltip cursor={{ fill: "rgba(0, 0, 0, 0.05)" }} />
        <Legend
          formatter={(value) => {
            switch (value) {
              case "calories":
                return "Calories (kCal)";
              case "poids":
                return "Poids (kg)";
              default:
                return value;
            }
          }}
          verticalAlign="top"
          align="right"
          width={230}
          iconType="circle"
          iconSize={8}
          wrapperStyle={{
            backgroundColor: "#f5f5f5",
            borderRadius: 3,
            lineHeight: "40px",
          }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
