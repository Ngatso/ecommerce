import { Link } from "@remix-run/react";

export default function Hero() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center">
      <div
        className="flex flex-1 rounded bg-black items-center justify-center flex-col p-3 h-full"
        style={{
          height: "60vh",
        }}
      >
        <img
          style={{
            width: 454.989,
            height: 190,
          }}
          src="https://images.squarespace-cdn.com/content/v1/60de2756bdea384623d3b191/148d06ee-b724-4fb9-855d-993b4cf6b6a7/New+Arrivals.png?format=750w"
        />
        <p className="text-white" style={{ fontSize: 21 }}>
          Check out these beautifully made cotton scarfs.
        </p>
        <Link
          to={"/scarf"}
          className="p-4 mt-8 bg-white rounded font-serif"
          type="button"
        >
          Shop Summer Scarfs
        </Link>
      </div>
      <div className="max-w-[500px] text-center">
        An effort to connect you closer to Tibetan culture Ngatso comes in with
        the sole aim of preserving and promoting the rich and unique Tibetan
        cultural heritage. We provide platform for Tibetan manufacturers and
        artist from all across the world to sell their products in United States
        and Canada.
        <div>
          <img src="https://images.squarespace-cdn.com/content/v1/60de2756bdea384623d3b191/b6a6e606-7a74-44fb-8183-f1aad815a1fd/Untitled+design+%284%29.jpg?format=1500w" />
        </div>
      </div>
    </section>
  );
}
