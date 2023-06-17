import { LoaderFunction } from "@remix-run/node";
import { useLoaderData,Link } from "@remix-run/react";
import { getRestaurants } from "~/model/restaurant";
import type { restaurantType } from "~/model/restaurant";

export const loader: LoaderFunction = async ({ request, params }) => {
  let restaurants: restaurantType[] = await getRestaurants();
  return { restaurants };
};

export default function Monasteries() {
  let { restaurants } = useLoaderData() as ReturnType<typeof loader>;
  return (
    <section>
      <h1 className="text-3xl font-bold text-center my-3">
        {" "}
        TIBETAN RESTAURANTS
      </h1>

      <div className="flex flex-wrap gap-3 max-w-5xl mt-10 mx-auto">
        {restaurants.map((restaurant:restaurantType) => (
          <Restaurant restaurant={restaurant} key={restaurant.id} />
        ))}
      </div>
    </section>
  );
}
function Restaurant({ restaurant }:{restaurant:restaurantType}) {
  let { name,thumbnail } = restaurant;
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
        to={`/restaurant/${restaurant.name}`}
        className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        Visit
      </Link>
    </div>
  );
}
