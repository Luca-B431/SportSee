import type { Route } from "./+types/page";
import Barchart from "~/components/barchart";
import Linechart from "~/components/linechart";
import SimpleRadarChart from "~/components/radarchart";
import SimpleRadialBarChart from "~/components/radialbarchart";
import Tab from "~/components/tab";

// export function loader({ params }: Route.LoaderArgs) {
//   const userId = params

// importer la foncttion

const data = {
  id: 12,
  userInfos: {
    firstName: "Karl",
    lastName: "Dovineau",
    age: 31,
  },
  todayScore: 0.12,
  keyData: {
    calorieCount: 1930,
    proteinCount: 155,
    carbohydrateCount: 290,
    lipidCount: 50,
  },
};

export function meta({}: Route.MetaArgs) {
  return [
    { title: "SportSee Application" },
    { name: "description", content: "Welcome to SportSee!" },
  ];
}

export default function Home() {
  return (
    <main>
      <div className="h-screen w-full px-24 py-12">
        <div id="content">
          <h1 className="text-5xl font-bold pb-8">
            {" "}
            Bonjour <span className="text-[#FF0101]">Thomas</span>{" "}
          </h1>
          <p className="text-xl">
            Félicitation ! Vous avez explosé vos objectifs hier 👏
          </p>

          {/* Graph container */}
          <div className="grid grid-cols-[5fr_1fr] grid-rows-2 py-16 gap-8">
            {/* Barchart Calories/Poids */}
            <Barchart />
            <div className="flex flex-col gap-4 col-start-2 row-span-2">
              <Tab
                picture="calories-icon.png"
                name="icône calories"
                value={data.keyData.calorieCount}
                unit="kCal"
                itemName="Calories"
              />
              <Tab
                picture="protein-icon.png"
                name="icône protéines"
                value={data.keyData.proteinCount}
                unit="g"
                itemName="Protéines"
              />
              <Tab
                picture="carbs-icon.png"
                name="icône glucides"
                value={data.keyData.carbohydrateCount}
                unit="g"
                itemName="Glucides"
              />
              <Tab
                picture="fat-icon.png"
                name="icône lipides"
                value={data.keyData.lipidCount}
                unit="g"
                itemName="Lipides"
              />
            </div>

            <div className="flex row-start-2 justify-between h-auto gap-8">
              <Linechart />
              <SimpleRadarChart />
              <SimpleRadialBarChart />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
