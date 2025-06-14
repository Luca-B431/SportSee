import { RadialBarChart, RadialBar, ResponsiveContainer, Legend } from 'recharts';

export default function SimpleRadialBarChart({ score }: { score: number | string }) {
  const scoreNumber = typeof score === 'string' ? parseFloat(score) : score;
  const percentage = scoreNumber * 100;
  const data = [{ name: 'Score', value: percentage }];

  return (
    <div className="relative w-[250px] h-[250px] bg-[#FBFBFB] rounded-sm">
      <svg width="300" height="300" className="absolute top-0 left-0" style={{ transform: 'translate(25px, 15px)' }}>
        <circle cx="100" cy="108" r="74" stroke="#e5e7eb" strokeWidth="10" fill="none" />
      </svg>

      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          data={data}
          width={300}
          className="flex-1"
          cx="50%"
          cy="49%"
          innerRadius="75%"
          outerRadius="100%"
          barSize={10}
          startAngle={90}
          endAngle={90 + (percentage / 100) * 360}
        >
          <RadialBar dataKey="value" fill="#ff0000" background cornerRadius={10} />
          <Legend
            iconSize={0}
            verticalAlign="top"
            align="left"
            wrapperStyle={{
              paddingLeft: 20,
              paddingTop: 20,
              fontSize: '14px',
              color: '#000',
            }}
            formatter={(value) => 'Score'}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-xl font-bold">
        {percentage}% <br />{' '}
        <span className="text-sm text-[#74798C]">
          de <br />
          votre objectif
        </span>
      </div>
    </div>
  );
}
