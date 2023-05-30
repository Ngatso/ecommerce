import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getEvents } from "~/model/event";
export const loader: LoaderFunction = async ({ request }) => {
  let events = await getEvents();
  return { events };
};

export default function Events() {
  const { events } = useLoaderData();
  return (
    <section>
      <h1 className="text-3xl font-bold text-center my-3"> Events</h1>
      <div className="flex flex-col gap-3 justify-center max-w-5xl mx-auto">
        {events.map((event) => (
          <Event event={event} key={event.id} />
        ))}
      </div>
    </section>
  );
}

function Event({ event }) {
  let { title, venue, date, registerUrl, description } = event;
  return (
    <div className="flex items-center">
      <div className="w-[400px] object-cover max-h-[260px] overflow-hidden">
        <img
          src="https://images.squarespace-cdn.com/content/v1/60de2756bdea384623d3b191/1684202859324-7O7U3A1DVLXS6RP3HXHZ/Prayers+for+His+Holiness+the+Dalai+Lama.jpg?format=750w"
          alt="Event Image"
        />
      </div>
      <div className="w-3/4 px-4">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600 mb-2">{venue}</p>
        <p className="text-gray-600 mb-2">{date}</p>
        <a href={registerUrl} className="text-blue-500 underline mb-2">
          Register
        </a>
        <p className="text-gray-800">{description}</p>
      </div>
    </div>
  );
}
