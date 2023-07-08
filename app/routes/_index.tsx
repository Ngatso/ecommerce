import { LinksFunction, LoaderArgs, LoaderFunction, V2_MetaFunction, json } from "@remix-run/node";
import { useLoaderData,Link } from "@remix-run/react";
import Hero from "~/layout/Hero";
import { eventType, getEvents } from "~/model/event";
import heroStyles from "~/style/hero.css";

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

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: heroStyles,
    },
  ];
};
export default function Index() {
  let { events } = useLoaderData();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <Hero />
      <div className="flex">
        <img
          style={{ lineHeight: 32, aspectRatio: "1:10" }}
          src="https://images.squarespace-cdn.com/content/v1/60de2756bdea384623d3b191/b6a6e606-7a74-44fb-8183-f1aad815a1fd/Untitled+design+%284%29.jpg?format=1500w"
        />
      </div>
      <div
        style={{
          paddingInline: "6vw",
          paddingTop: "calc(10vmax / 10)",
          paddingBottom: "calc(10vmax / 10)",
        }}
      >
        <div
          className="uppercase flex w-full justify-center font-caslon text-center whitespace-pre-wrap"
          style={{ padding: "17px !important" }}
        >
          Explore latest events
        </div>
      </div>
      <div
        className="mx-3 flex flex-wrap gap-3 justify-center"
        style={{ marginBlock: "2vw" }}
      >
        {events?.map((event: eventType) => {
          return (
            <div key={event.id} className="card max-h-60 max-w-sm">
              <img
                src={event.poster}
                className="w-full hover:scale-105 transition-all h-full object-cover"
              />
              <div className="description">
                <Link
                  to={`/events/${event.title}`}
                  className="uppercase flex-1 p-1 rounded-sm w-full text-center"
                >
                  visit
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
