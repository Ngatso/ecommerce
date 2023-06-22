import {Link} from '@remix-run/react'
type HightlightProps = {
    name: string;
}


export default function HighlightSection({name}: HightlightProps) {
    return (
      <div
        className="highlightSection flex flex-col gap-2 justify-center items-center mx-auto my-0 bg-gray-100"
        style={{ paddingInline: "2vw",minHeight:"12vh" }}
      >
        <div className="uppercase pt-3 font-caslon">{name}</div>
        <div className="flex gap-3 font-caslon">
          <Link to={`/events?city=${name}`}>Events</Link>|
          <Link to={`/restaurant?city=${name}`}>Eats</Link>|
          <Link to={`/monastery?city=${name}`}>Monasteries</Link>
        </div>
      </div>
    );
}