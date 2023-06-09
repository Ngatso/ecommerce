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
  style: "mapbox://styles/mapbox/streets-v12",
  center: [monastery.longitude, monastery.latitude], // starting position [lng, lat]
  zoom: 9, // starting zoom
});

let marker = {
  properties: {
    message: monastery.name,
    iconSize: [60, 60],
  },
};
 const el = document.createElement("div");
 const width = marker.properties.iconSize[0];
 const height = marker.properties.iconSize[1];
 el.className = "marker";
 el.style.backgroundImage = `url(/mark.png)`;
 el.style.width = `${width}px`;
 el.style.height = `${height}px`;
 el.style.backgroundSize = "100%";

 el.addEventListener("click", () => {
   window.alert(marker.properties.message);
 });
    new mapboxgl.Marker(el)
      .setLngLat([monastery.longitude, monastery.latitude])
      .addTo(map);
  },[])
let images = monastery.photos
    let LightBoxSrc = useMemo(() => {
      return images.map((str, index) => {
        return { src: images[index] };
      });
    }, [images]);
  return (
    <section
      style={{ paddingInline: "2vw", paddingBlock: "3vw" }}
      className="max-w-6xl mx-auto"
    >
      <div className="flex flex-col md:flex-row justify-between">
        <div className="flex-1">
          <h3
            className="capitalize sectionTitle"
            style={{
              letterSpacing: "0.64px",
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
      <div className="grid p-5">
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
      {monastery.lama_name && (
        <div
          id="lama-section "
          className="flex flex-col gap-3 md:flex-row max-w-5xl m-auto"
        >
          <div className="flex-1">
            <img
              src={monastery.lama_photo}
              alt="Lama Photo"
              className="w-full hover:scale-105  transition-all duration-500 ease-in-out object-cover   h-full"
            />
          </div>
          <div className="flex-1 md:ml-20">
            <h3 className=" text-3xl mb-3">{monastery.lama_name}</h3>
            <p>{monastery.lama_description}</p>
          </div>
        </div>
      )}
    </section>
  );
}
