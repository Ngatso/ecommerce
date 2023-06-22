import { LoaderFunction } from "@remix-run/node";
import { getMonasteries, getMonasteryByCity } from "~/model/monastery";
import { useLoaderData ,Link} from "@remix-run/react";
import { City } from "@prisma/client";
export const loader: LoaderFunction = async ({ request, params }) => {
  const url = new URL(request.url);
  const city = url.searchParams.get("city") as City;
  let monastery;
  if (city) {
    monastery = await getMonasteryByCity(city);
    return { monastery,city };
  }
  monastery = await getMonasteries();
  return { monastery };
};

export default function Monasteries() {
  let { monastery,city } = useLoaderData();
  return (
    <section style={{ paddingInline: "2vw" }}>
      <h1
        className="text-xl container my-3"
        style={{ wordSpacing: "5px", marginBottom: 36 }}
      >
        {" "}
        TIBETAN BUDDHIST MONASTERIES IN <span className="uppercase">{city}</span>
      </h1>
      <p className="font-minion " style={{ fontSize: 18 }}>
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
  let { name, location, thumbnail } = monastery;
  return (
    <div className="max-w-xs flex flex-col justify-center">
      <div className="max-h-[245px] max-w-[360px] overflow-hidden">
        <img
          className="w-full object-cover hover:scale-105 transition-all duration-500 ease-in-out rounded"
          src={thumbnail}
        />
      </div>
      <div className="text-lg text-center py-2 capitalize">{name}</div>
      <Link
        to={"/monastery/" + name}
        className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        Visit
      </Link>
    </div>
  );
}
