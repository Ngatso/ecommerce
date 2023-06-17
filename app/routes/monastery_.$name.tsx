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
    let monastery = await getMonastery(params.name);
    let mapsApiKey = process.env.REACT_APP_MAP_API_KEY;
    
  return { monastery, mapsApiKey };
};
export default function Monastery() {
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
  center: [monastery.longitude,monastery.latitude], // starting position [lng, lat]
  zoom: 9, // starting zoom
});
    
  },[])
let images = monastery.photos
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
            address: {monastery.area} {monastery.city} {monastery.state}{" "}
          </p>
          <p className="capitalize" style={{ marginBottom: 18, fontSize: 18 }}>
            visit hours: {monastery.opening}
          </p>
          <p className="capitalize" style={{ marginBottom: 18, fontSize: 18 }}>
            contact: {monastery.contact_phone}
          </p>
          <p className="capitalize" style={{ marginBottom: 18, fontSize: 18 }}>
            website: {monastery.website}
          </p>
          <p className="capitalize" style={{ marginBottom: 18, fontSize: 18 }}>
            parking: {monastery.parking}
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
