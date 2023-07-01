import { Link } from "@remix-run/react";
import metaData from '~/metaData.json'
import { ClientOnly } from "remix-utils";
export default function Hero() {
  return (
    <ClientOnly fallback={<div/>}>
        {()=>
        <section className="flex flex-col  items-center justify-center">
          <div
            className="relative flex flex-col flex-1 rounded   items-center  p-3 w-full "
            style={{
              minHeight: "73dvh",
            }}
          >
            <video
              className="absolute top-0 left-0 w-full h-full object-cover "
              autoPlay
              loop
              muted
              playsInline
              style={{ opacity: 1, zIndex: -1 }}
            >
              <source
                src={metaData.hero_video}
                type="video/mp4"
              />
            </video>
            <img
              className="mt-24"
              style={{
                width: 455,
                height: 190,
                zIndex: -1,
              }}
              alt="tashidelek"
              src="https://images.squarespace-cdn.com/content/v1/60de2756bdea384623d3b191/148d06ee-b724-4fb9-855d-993b4cf6b6a7/New+Arrivals.png?format=750w"
            />
            <div className="flex flex-col flex-1 justify-between py-4 items-center pt-4">
              <p className="text-white font-caslon " style={{ fontSize: 18, wordSpacing: 2, fontWeight: "bold" }}>
                {metaData.hero_description}
              </p>
              <Link
                to={metaData.hero_button_link}
                className="py-2 px-6 mt-8 bg-white rounded "
                type="button"
              >
                {metaData.hero_button_text}
              </Link>
            </div>
          </div>
          <div className=" text-center ">
            <h2
              className="font-semibold mb-10 text-center mt-4 font-caslon"
              style={{
                fontSize: 21,
                letterSpacing: 0.4,
                lineHeight: "32px",
                fontWeight: "bolder",
              }}
            >
              {metaData.description_title}
            </h2>
            <div
              className="text-center text-l font-minion max-w-[610px]"
              style={{
                lineHeight: "32px",
                fontSize: 18,
                letterSpacing: "normal",
              }}
            >
              {metaData.description_text}
            </div>
          </div>
          <div className="flex">
            <img
              style={{ lineHeight: 32, aspectRatio: "1:10" }}
              src="https://images.squarespace-cdn.com/content/v1/60de2756bdea384623d3b191/b6a6e606-7a74-44fb-8183-f1aad815a1fd/Untitled+design+%284%29.jpg?format=1500w"
            />
          </div>
        </section>}
          </ClientOnly>
  );
}
