// import { Line } from "recharts
import type { Route } from './+types/$id';
import flattenData from '~/services/formatter';
import Barchart from '~/components/barchart';
import Linechart from '~/components/linechart';
import SimpleRadarChart from '~/components/radarchart';
import SimpleRadialBarChart from '~/components/radialbarchart';
import Tab from '~/components/tab';
import { fetchUserData, fetchUserActivity, fetchUserAverageSessions, fetchUserPerformance } from '~/services/api';

export async function loader({ params }: Route.LoaderArgs) {
  // const userData = await fetchUserData(params.id);
  // const activity = await fetchUserActivity(params.id);
  // const averageSessions = await fetchUserAverageSessions(params.id);
  // const performance = await fetchUserPerformance(params.id);
  const [userData, activity, averageSessions, performance] = await Promise.all([
    fetchUserData(params.id),
    fetchUserActivity(params.id),
    fetchUserAverageSessions(params.id),
    fetchUserPerformance(params.id),
  ]);

  return {
    firstData: userData,
    activity,
    averageSessions,
    performance,
  };
}

export function meta({}: Route.MetaArgs) {
  return [{ title: 'SportSee Application' }, { name: 'description', content: 'Welcome to SportSee!' }];
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const data = loaderData;

  if (!data) {
    return (
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold text-red-500">Error: User data not found</h1>
      </div>
    );
  }

  const formatData = flattenData(data.firstData);

  if (!data?.firstData) {
    console.error('firstData is missing in loaderData');
  }
  return (
    <>
      <main className="">
        <div className="h-screen xl:px-24 py-12">
          <div id="content " className="w-full">
            <h1 className="text-5xl font-bold pb-8">
              {' '}
              Bonjour <span className="text-[#FF0101]">{formatData[0].value}</span>{' '}
            </h1>
            <p className="text-xl">Félicitations ! Vous avez explosé vos objectifs hier 👏</p>

            {/* Graph container */}
            <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] grid-rows-3 xl:grid-rows-2 py-16 gap-8 w-full">
              {/* Barchart Calories/Poids */}
              <Barchart data={data.activity.data.sessions} />

              {/* Tabs container */}
              <div className="flex xl:flex-col h-auto items-center xl:gap-4 xl:col-start-2 xl:row-span-2">
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
                <Linechart data={data.averageSessions.data.sessions} />
                <SimpleRadarChart performance={data.performance.data} />
                <SimpleRadialBarChart score={formatData[7].value} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
