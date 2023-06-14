import { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
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
      <center>
        Click{" "}
        <Link to="/events/form" prefetch="intent">
          -here-
        </Link>
        to feature your event for free.
      </center>
      <div className="flex flex-col gap-3 justify-center max-w-5xl mx-auto">
        {events.map((event) => (
          <Event event={event} key={event.id} />
        ))}
      </div>
    </section>
  );
}

function Event({ event }) {
  let { title, venue, date, registerUrl, description,poster } = event;
  let readabledata = new Date(date);

 

  function addHttp(registerUrl: any): string | undefined {
    if (registerUrl.startsWith("http://") || registerUrl.startsWith("https://")) {
    return registerUrl;
    } else {
      return "https://" + registerUrl;
    }
  }
  function handleErrorImg(e: any) {
    e.target.onerror = null;
    e.target.src = "https://placehold.co/600x400";
  }
  let imgsrc = addHttp(poster[0]);
  return (
    <div className="flex items-center mb-4">
      <div className="w-[400px] object-cover max-h-[210px] flex-1 overflow-hidden rounded shadow">
        <img
          src={imgsrc}
          alt="Event Images"
          onError={handleErrorImg}
          className="hover:scale-105  transition-all duration-500 ease-in-out object-cover w-full h-full"
        />
      </div>
      <div className="w-3/4 px-4">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600 mb-2">{venue}</p>
        <p className="text-gray-600 mb-2">{readabledata.toString()}</p>
        <a
          href={addHttp(registerUrl)}
          target="_blank"
          className="text-blue-500 underline mb-2"
        >
          Register
        </a>
        <p className="text-gray-800">{description}</p>
      </div>
    </div>
  );
}
