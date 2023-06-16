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
      <center className="py-3">
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
const day = readabledata.getDate();
 const month = readabledata.toLocaleString("en-US", { month: "short" });
const options = { hour12: true };
const timeString = readabledata.toLocaleTimeString("en-US", options);
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
    <div className="flex  mb-4 gap-3">
      <div className="relative">
        <Link to={`/events/${title}`}>
          <img
            src={imgsrc}
            alt="Event Images"
            onError={handleErrorImg}
            style={{ width: "45vw" }}
            className="hover:scale-105  transition-all duration-500 ease-in-out object-cover   h-full"
          />
        </Link>
        <div
          style={{ width: "70px", height: "70px" }}
          className="absolute right-3 top-3 bg-white  flex flex-col items-center justify-center font-serif text-md uppercase"
        >
          <div>{month}</div>
          <div>{day}</div>
        </div>
      </div>
      <div className="w-3/4 px-4 flex justify-start flex-col items-start">
        <Link to={`/events/${title}`} >
          <h2 className="text-2xl  mb-2" style={{ wordSpacing: "3px" }}>
            {title}
          </h2>
        </Link>
        <br/>
        <p className="text-gray-600 mb-2"> {timeString}</p>
        <p className="text-gray-600 mb-2">{venue}</p>
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
