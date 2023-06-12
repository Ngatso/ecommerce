import { LoaderFunction } from "@remix-run/node";
import { getMonastery, getMonasteryByCity } from "~/model/monastery";
import { useLoaderData } from "@remix-run/react";
export const loader: LoaderFunction = async ({ request, params }) => {
  let city = params.city as string;
  let monastery;
  if (city) {
    monastery = await getMonasteryByCity(city);
  } else {
    monastery = await getMonastery();
  }
  return { monastery };
};

export default function Monasteries() {
  let { monastery } = useLoaderData();
  return (
    <section>
      <h1 className="text-3xl font-bold text-center my-3">
        {" "}
        TIBETAN BUDDHIST MONASTERIES
      </h1>
      <p className="max-w-xl text-center mx-auto">
        The essence of Tibetan Buddhism is about controlling & mastering one’s
        inner emotions. As the materialistic world pays too much heed to the
        outer and physical development, there is often a negligence in the care
        and growth of inner values, also called emotional hygiene, which is
        equally and sometimes more important. Tibetan Buddhism has an immense
        depth of knowledge to offer towards emotional well being. This page
        includes all the Tibetan Monasteries in the India.
      </p>
      <div className="flex flex-wrap gap-3 max-w-5xl mt-10 mx-auto">
        {monastery.map((monastery) => (
          <Monastery monastery={monastery} key={monastery.id} />
        ))}
      </div>
    </section>
  );
}
function Monastery({ monastery }) {
  let { name, location, image } = monastery;
  return (
    <div className="max-w-xs flex flex-col justify-center">
      <div className="max-h-[245px] max-w-[360px] overflow-hidden">
        <img
          className="w-full object-cover"
          src={
            "https://images.squarespace-cdn.com/content/v1/60de2756bdea384623d3b191/1654883717657-1TFJIL3PRHJJLWAT80LW/outside.png?format=500w"
          }
        />
      </div>
      <div className="text-lg">{name}</div>
      <button
        type="button"
        className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        Visit
      </button>
    </div>
  );
}