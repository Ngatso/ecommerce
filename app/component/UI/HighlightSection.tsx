import {Link,useLocation} from '@remix-run/react'
type HightlightProps = {
    name: string;
}


export default function HighlightSection({ name }: HightlightProps) {
  let location = useLocation();
  let option=location.pathname.split("/")[1]
    return (
      <div
        className="highlightSection flex flex-col gap-2 justify-center items-center mx-auto my-0 bg-gray-100"
        style={{ paddingInline: "2vw", minHeight: "12vh" }}
      >
        <div className="uppercase pt-3 font-caslon">{name}</div>
        {!name && (
          <div className="flex gap-2">
            <Link to={`/${option}?city=Delhi`}>Delhi</Link>|
            <Link to={`/${option}?city=Dharamshala`}>Dharamshala</Link>
          </div>
        )}
        {name ? (
          <div className="flex gap-3 font-caslon">
            <Link to={`/events?city=${name}`}>Events</Link>|
            <Link to={`/restaurant?city=${name}`}>Eats</Link>|
            <Link to={`/monastery?city=${name}`}>Monasteries</Link>
          </div>
        ) : (
          <div className="flex gap-3 font-caslon">
            <Link to={`/events`}>Events</Link>|
            <Link to={`/restaurant`}>Eats</Link>|
            <Link to={`/monastery`}>Monasteries</Link>
          </div>
        )}
      </div>
    );
}