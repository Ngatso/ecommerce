import { Link } from "@remix-run/react";

export default function Hero() {
  return (
    <section className="flex flex-col  items-center justify-center">
      <div
        className="relative flex flex-col flex-1 rounded   items-center  p-3 w-full "
        style={{
          minHeight: "70dvh",
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
            src="https://static.videezy.com/system/resources/previews/000/034/316/original/P1170066_5.mp4"
            type="video/mp4"
          />
        </video>
        <div className="flex flex-col flex-1 justify-around items-center">
          <img
            style={{
              width: 455,
              height: 190,
              zIndex: -1,
            }}
            src="https://images.squarespace-cdn.com/content/v1/60de2756bdea384623d3b191/148d06ee-b724-4fb9-855d-993b4cf6b6a7/New+Arrivals.png?format=750w"
          />
          <p className="text-white" style={{ fontSize: 21 }}>
            Discover our exquisite collection of cotton coats, meticulously
            crafted to adorn your style.
          </p>
          <Link
            to={"/Coat"}
            className="p-4 mt-8 bg-white rounded font-serif"
            type="button"
          >
            Shop Summer Coat
          </Link>
        </div>
      </div>
      <div className="max-w-[500px] text-center ">
        <h2 className="font-semibold mb-10 mt-2 text-xl ">
          An effort to connect you closer to Tibetan culture
        </h2>
        <div className="text-center text-l">
          Ngatso comes in with the sole aim of preserving and promoting the rich
          and unique Tibetan cultural heritage. We provide platform for Tibetan
          manufacturers and artist from all across the world to sell their
          products in United States and Canada.
        </div>
      </div>
      <div className="flex max-w-[685px]">
        <img
          className="flex-1"
          src="https://images.squarespace-cdn.com/content/v1/60de2756bdea384623d3b191/b6a6e606-7a74-44fb-8183-f1aad815a1fd/Untitled+design+%284%29.jpg?format=1500w"
        />
      </div>
    </section>
  );
}
