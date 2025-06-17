import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { TooltipProps } from 'recharts';

export default function Linechart({ data }: { data: { day: string; sessionLength: number }[] }) {
  const [hovered, setHovered] = useState(false);

  const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

  const getExtendedData = (data: { day: string; sessionLength: number }[]) => {
    if (data.length < 2) return data;
    return [
      { day: '', sessionLength: data[1].sessionLength },
      ...data,
      { day: '', sessionLength: data[data.length - 1].sessionLength },
    ];
  };

  const extendedData = getExtendedData(data);

  const CustomLegend = () => (
    <div
      style={{
        color: '#FFF8',
        fontSize: 14,
        fontWeight: 800,
        paddingLeft: 20,
      }}
    >
      Durée moyenne des <br /> sessions
    </div>
  );

  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;
      const label = payload[0].payload.day;
      if (!label) return null;
      return (
        <div
          style={{
            background: '#FFF',
            padding: '4px 8px',
            borderRadius: 4,
          }}
        >
          <p style={{ margin: 0, color: '#000', fontSize: 12 }}>{value} min</p>
        </div>
      );
    }
    return null;
  };

  const customActiveDot = (props: any) => {
    const { cx, cy, r = 4, index } = props;
    if (index === 0 || cx === undefined || cy === undefined) {
      return <circle cx={cx ?? 0} cy={cy ?? 0} r={0} fill="transparent" stroke="transparent" />;
    }
    return <circle cx={cx} cy={cy} r={r} fill="#FFF" stroke="#FFF" strokeWidth={2} />;
  };

  return (
    <div
      style={{
        overflowX: 'auto',
        backgroundColor: '#FF0000',
        width: 250,
        height: 250,
        borderRadius: 5,
        position: 'relative',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={extendedData} margin={{ top: 20, right: 0, bottom: 30, left: 0 }}>
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            stroke="#FFFa"
            interval={0}
            tick={{ dy: 30 }}
            padding={{ left: 0, right: 0 }}
            tickFormatter={(day) => days[parseInt(day) - 1] || ''}
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
      </ResponsiveContainer>
    </div>
  );
}
