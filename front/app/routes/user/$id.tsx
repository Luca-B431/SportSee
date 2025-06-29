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
  let errorMsg = '';
  let userData = null;
  let activity = null;
  let averageSessions = null;
  let performance = null;

  try {
    userData = await fetchUserData(params.id);
    if (!userData) throw new Error('Utilisateur introuvable');
    activity = await fetchUserActivity(params.id);
    if (!activity?.data?.sessions) throw new Error('Aucune activité trouvée pour cet utilisateur');
    averageSessions = await fetchUserAverageSessions(params.id);
    if (!averageSessions?.data?.sessions) throw new Error('Aucune session trouvée pour cet utilisateur');
    performance = await fetchUserPerformance(params.id);
    if (!performance?.data?.data) throw new Error('Aucune performance trouvée pour cet utilisateur');
  } catch (error) {
    errorMsg = error instanceof Error ? error.message : 'Erreur inconnue lors du chargement des données utilisateur.';
  }

  return {
    firstData: userData,
    activity,
    averageSessions,
    performance,
    errorMsg,
  };
}

export function meta({}: Route.MetaArgs) {
  return [{ title: 'SportSee Application' }, { name: 'description', content: 'Welcome to SportSee!' }];
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const data = loaderData;

  if (data?.errorMsg) {
    return (
      <main className="h-screen flex items-center justify-center">
        <div className="bg-red-100 text-red-700 p-8 rounded shadow text-center w-120">
          <h1 className="text-3xl font-bold mb-4">Erreur</h1>
          <p className="text-lg">{data.errorMsg}</p>
        </div>
      </main>
    );
  }

  if (!data || !data.firstData) {
    return (
      <main className="">
        <div className="h-screen flex items-center justify-center">
          <p className="text-2xl font-bold">Chargement des données...</p>
        </div>
      </main>
    );
  }

  const formatData = flattenData(data.firstData);

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
              {data.activity && <Barchart data={data.activity.data.sessions} />}

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
                {data.averageSessions && <Linechart data={data.averageSessions.data.sessions} />}
                {data.performance && <SimpleRadarChart performance={data.performance.data} />}
                <SimpleRadialBarChart score={formatData[7].value} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
