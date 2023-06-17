import { LoaderArgs, LoaderFunction } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { getMonastery } from "~/model/monastery";
import { useMemo,useEffect ,useState} from "react";
import mapboxgl from "mapbox-gl/dist/mapbox-gl.js";
import Lightbox from "yet-another-react-lightbox";
export const loader: LoaderFunction = async ({
  request,
  params,
}: LoaderArgs) => {
    let monastery = await getMonastery(params.monasteryname);
    let mapsApiKey = process.env.REACT_APP_MAP_API_KEY;
    
  return { monastery, mapsApiKey };
};
export default function Events() {
    let { monastery, mapsApiKey } = useLoaderData();
  function handleErrorImg(e: any) {
    e.target.onerror = null;
    e.target.src = "https://placehold.co/600x400";
    }
    const [lightBoxIndex, setlightBoxIndex] = useState(-1);
    
  useEffect(()=>{
mapboxgl.accessToken = mapsApiKey;
var map = new mapboxgl.Map({
  container: "mapdiv",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [-74.5, 40], // starting position [lng, lat]
  zoom: 9, // starting zoom
});
  },[])
let images = [
  "https://images.squarespace-cdn.com/content/v1/60de2756bdea384623d3b191/479e6269-8a3f-45ce-a17a-a01a61de43da/2.jpg?format=500w",
  "https://images.squarespace-cdn.com/content/v1/60de2756bdea384623d3b191/1fd7d3af-2d21-43da-9083-c3b2619965bd/3.jpg?format=500w",
  "https://images.squarespace-cdn.com/content/v1/60de2756bdea384623d3b191/820c4095-e4fe-43ba-b002-1602ce0c2a8e/1.jpg?format=500w",
    ];
    let LightBoxSrc = useMemo(() => {
      return images.map((str, index) => {
        return { src: images[index] };
      });
    }, [images]);
  return (
    <section style={{ paddingInline: "2vw", paddingBlock: "3vw" }}>
      <div className="flex flex-col md:flex-row justify-between">
        <div className="flex-1">
          <h3
            className="capitalize"
            style={{
              letterSpacing: "0.64px",
              fontSize: "33px",
              fontFamily: "caslon",
              marginBottom: 32,
            }}
          >
            {monastery.name}
          </h3>
          <p className="capitalize" style={{ marginBottom: 18, fontSize: 18 }}>
            address: {monastery.location} {monastery.city}
          </p>
          <p className="capitalize" style={{ marginBottom: 18, fontSize: 18 }}>
            visit hours: 12:00pm - 4:00pm
          </p>
          <p className="capitalize" style={{ marginBottom: 18, fontSize: 18 }}>
            contact:423424234234234234
          </p>
          <p className="capitalize" style={{ marginBottom: 18, fontSize: 18 }}>
            website: website.com
          </p>
          <p className="capitalize" style={{ marginBottom: 18, fontSize: 18 }}>
            parking: On street parking
          </p>
        </div>
        <div className="flex-1">
          <div id="mapdiv" style={{ width: "100%", height: 210 }}></div>
        </div>
      </div>
      <div className="p-5 flex gap-4 flex-wrap">
        {images.map((imgsrc: string, index) => {
          return (
            <img
              key={imgsrc}
              src={imgsrc}
              onClick={() => setlightBoxIndex(index)}
              alt="Event Images"
              onError={handleErrorImg}
              style={{ width: 180, height: 150 }}
              className="hover:scale-105  transition-all duration-500 ease-in-out object-cover   h-full"
            />
          );
        })}
      </div>
      <Lightbox
        index={lightBoxIndex}
        open={lightBoxIndex >= 0}
        close={() => setlightBoxIndex(-1)}
        slides={LightBoxSrc}
      />
    </section>
  );
}
