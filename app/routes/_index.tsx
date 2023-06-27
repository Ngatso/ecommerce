import { LoaderArgs, LoaderFunction, json } from "@remix-run/node";
import { useLoaderData,Link } from "@remix-run/react";
import Hero from "~/layout/Hero";
import { getEvents } from "~/model/event";
export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  const env = {
    SUPABASE_URL: process.env.SUPABASE_URL!,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!,
  };
  let events = await getEvents();

  return json({
    env,
    events
  });
};

export default function Index() {
  let { events } = useLoaderData();
  console.log(events)
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <Hero />
      
      <div className='mx-3 flex flex-wrap gap-3'>
      {
        events?.map((event) => {
          return (
            <div
              key={event.id}
              className="card max-w-xs"
            >
              <img src={event.poster} className="w-full " />
              <div className="description">
                <div className="font-caslon">{event.title}</div>
                <Link to={`/event/${event.title}`} className="uppercase p-1 rounded-sm">visit</Link>
              </div>
            </div>
          );
        })
      }
      </div>
    </div>
  );
}
