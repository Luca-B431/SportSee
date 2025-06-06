import type { Route } from "./+types/page";
import Barchart from "~/components/barchart";
import Linechart from "~/components/linechart";
import SimpleRadarChart from "~/components/radarchart";

// export function loader({ params }: Route.LoaderArgs) {
//   const userId = params

// importer la foncttion

export function meta({}: Route.MetaArgs) {
  return [
    { title: "SportSee Application" },
    { name: "description", content: "Welcome to SportSee!" },
  ];
}

export default function Home() {
  return (
    <main>
      <div className="h-screen w-full px-24 py-16">
        <div id="content">
          <h1 className="text-5xl font-bold pb-8">
            {" "}
            Bonjour <span className="text-[#FF0101]">Thomas</span>{" "}
          </h1>
          <p className="text-xl">
            Félicitation ! Vous avez explosé vos objectifs hier 👏
          </p>

          {/* Graph container */}
          <div className="grid grid-cols-[3fr_1fr] grid-rows-2 py-16 gap-y-4">
            {/* Barchart Calories/Poids */}
            <Barchart />

            <div className="flex row-start-2 justify-between h-auto gap-8">
              <Linechart />
              <SimpleRadarChart />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
