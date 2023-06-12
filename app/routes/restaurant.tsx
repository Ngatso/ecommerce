import { LoaderFunction } from "@remix-run/node";
import { getMonastery, getMonasteryByCity } from "~/model/monastery";
import { useLoaderData } from "@remix-run/react";
import { getRestaurants, getRestuarantsByCity } from "~/model/restaurant";
export const loader: LoaderFunction = async ({ request, params }) => {
  let restaurants = await getRestaurants();
  return { restaurants };
};

export default function Monasteries() {
  let { restaurants } = useLoaderData();
  console.log(restaurants);
  return (
    <section>
      <h1 className="text-3xl font-bold text-center my-3">
        {" "}
        TIBETAN RESTAURANTS
      </h1>

      <div className="flex flex-wrap gap-3 max-w-5xl mt-10 mx-auto">
        {restaurants.map((restaurant) => (
          <Restaurant restaurant={restaurant} key={restaurant.id} />
        ))}
      </div>
    </section>
  );
}
function Restaurant({ restaurant }) {
  let { name, location, image } = restaurant;
  return (
    <div className="max-w-xs flex flex-col justify-center">
      <div className="max-h-[245px] max-w-[360px] overflow-hidden">
        <img
          className="w-full object-cover"
          src={
            "https://images.squarespace-cdn.com/content/v1/60de2756bdea384623d3b191/1682875483861-B6G9PTY2CMDOVPITG8BB/20230120_190852.jpg?format=500w"
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
