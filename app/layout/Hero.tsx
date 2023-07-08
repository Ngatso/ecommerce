import {  useLoaderData } from "@remix-run/react";
import metaData from '~/metaData.json'
import { ClientOnly } from "remix-utils";
import { Link } from "@remix-run/react";
import {useEffect,useState} from 'react'

export default function Hero() {
  const { events } = useLoaderData();
  const [randomEvent, setRandomEvent] = useState(null);
  useEffect(() => {
    let eventcount = events.length;
    let randomIndex = Math.floor(Math.random() * eventcount);
    setRandomEvent(events[randomIndex]);
  }, [])
  if (randomEvent == null) return null;
  
  return (
    <ClientOnly fallback={<div />}>
      {() => (
        <section
          className="banner"
          style={{
            backgroundSize: "cover",
            backgroundImage: `url("${randomEvent.poster}")`,
            backgroundPosition: "center center",
          }}
        >
          <div className="banner_content flex flex-col gap-4">
            <h1 className="banner_title">{randomEvent.title}</h1>
            <div className="banner_buttons">
              <Link to={"/events/" + randomEvent.title}>
                <button className="banner_button">Visit</button>
              </Link>
              <Link to={"/events"}>
                <button className="banner_button">All Events</button>
              </Link>
            </div>
            <h1 className="banner_description">{metaData.hero_description}</h1>
          </div>
          <div className="banner--fadeButton"></div>
        </section>
      )}
    </ClientOnly>
  );
}
