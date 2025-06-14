// import { Line } from "recharts
import type { Route } from './+types/$id';
import flattenData from '~/services/formatter';
import Barchart from '~/components/barchart';
import Linechart from '~/components/linechart';
import SimpleRadarChart from '~/components/radarchart';
import SimpleRadialBarChart from '~/components/radialbarchart';
import Tab from '~/components/tab';

export async function loader({ params }: Route.LoaderArgs) {
  // call 1
  const response1 = await fetch(`http://localhost:3000/user/${params.id}`);
  if (!response1.ok) throw new Response('First Call, Not Found', { status: 404 });
  const { data: userData }: { data: UserData } = await response1.json();

  // call 2
  const response2 = await fetch(`http://localhost:3000/user/${params.id}/activity`);
  if (!response2.ok) throw new Response('Second Call, Activity Not Found', { status: 404 });
  const data2 = await response2.json();

  // call 3
  const response3 = await fetch(`http://localhost:3000/user/${params.id}/average-sessions`);
  if (!response3.ok) throw new Response('Third Call, Session Not Found', { status: 404 });
  const data3 = await response3.json();

  // call 4
  const response4 = await fetch(`http://localhost:3000/user/${params.id}/performance`);
  if (!response4.ok) throw new Response('Fourth Call, Performance Not Found', { status: 404 });
  const data4 = await response4.json();

  return {
    firstData: userData,
    activity: data2,
    averageSessions: data3,
    performance: data4,
  };
}

export function meta({}: Route.MetaArgs) {
  return [{ title: 'SportSee Application' }, { name: 'description', content: 'Welcome to SportSee!' }];
}

type UserData = {
  id: number;
  userInfos: {
    age: number;
    firstName: string;
    lastName: string;
  };
  todayScore?: number;
  score?: number;
  keyData: {
    calorieCount: number;
    proteinCount: number;
    carbohydrateCount: number;
    lipidCount: number;
  };
};

export default function Home({ loaderData }: Route.ComponentProps) {
  const data = loaderData;

  if (!data) {
    return (
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold text-red-500">Error: User data not found</h1>
      </div>
    );
  }

  console.log(data);
  const formatData = flattenData(data.firstData);
  console.log(formatData);
  console.log(data.activity.data.sessions);

  if (!data?.firstData) {
    console.error('firstData is missing in loaderData');
  }
  return (
    <>
      <main>
        <div className="h-screen w-full px-24 py-12">
          <div id="content">
            <h1 className="text-5xl font-bold pb-8">
              {' '}
              Bonjour <span className="text-[#FF0101]">{formatData[0].value}</span>{' '}
            </h1>
            <p className="text-xl">Félicitations ! Vous avez explosé vos objectifs hier 👏</p>

            {/* Graph container */}
            <div className="grid grid-cols-[2fr_1fr] grid-rows-2 py-16 gap-8 w-full">
              {/* Barchart Calories/Poids */}
              <Barchart data={data.activity.data.sessions} />

              {/* Tabs container */}
              <div className="flex flex-col items-center gap-4 col-start-2 row-span-2 w-full">
                <Tab
                  picture="/calories-icon.png"
                  name="icône calories"
                  value={formatData[3].value}
                  unit="kCal"
                  itemName="Calories"
                />
                <Tab
                  picture="/protein-icon.png"
                  name="icône protéines"
                  value={formatData[4].value}
                  unit="g"
                  itemName="Protéines"
                />
                <Tab
                  picture="/carbs-icon.png"
                  name="icône glucides"
                  value={formatData[5].value}
                  unit="g"
                  itemName="Glucides"
                />
                <Tab
                  picture="/fat-icon.png"
                  name="icône lipides"
                  value={formatData[6].value}
                  unit="g"
                  itemName="Lipides"
                />
              </div>

              <div className="flex row-start-2 justify-between items-end gap-x-4 w-full">
                <Linechart />
                <SimpleRadarChart />
                <SimpleRadialBarChart score={formatData[7].value} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
