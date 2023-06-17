import { LoaderArgs, LoaderFunction } from "@remix-run/node";
import { useLoaderData,Link } from "@remix-run/react";
import { getEvent } from "~/model/event";
export const loader:LoaderFunction = async ({ request, params }:LoaderArgs) => {
    let event = await getEvent(params.eventname);
    return event
 }
export default function Events() { 
    let event = useLoaderData();
    let imgsrc = event.poster[0];
      function handleErrorImg(e: any) {
        e.target.onerror = null;
        e.target.src = "https://placehold.co/600x400";
    }
  let readabledata = new Date(event.date);
  var convertedTime = readabledata.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
    
    return (
      <section style={{ paddingInline: "3vw", paddingBlock: "2vw" }}>
        <Link to="/events" className="backLink p-3 mb-12">
          Back to All Events
        </Link>
        <div className="flex flex-col md:flex-row gap-3 justify-start max-w-5xl mx-auto">
          <div className="flex flex-col flex-1">
            <h2 className="text-2xl  my-2 " style={{ wordSpacing: "3px" }}>
              {event.title}
            </h2>
            <div>{readabledata.toDateString()}</div>
            <div className="mb-3">{convertedTime}</div>
            <div>{event.venue}</div>
            <p>{event.description}</p>
          </div>
          <div className="flex-1">
            <img
              src={imgsrc}
              alt="Event Images"
              onError={handleErrorImg}
              style={{ width: "45vw" }}
              className="hover:scale-105  transition-all duration-500 ease-in-out object-cover   h-full"
            />
          </div>
        </div>
      </section>
    );
}