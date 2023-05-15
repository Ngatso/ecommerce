import type {
  LoaderArgs,
  LoaderFunction,
  V2_MetaFunction,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Footer from "~/layout/Footer";
import Header from "~/layout/Header";
import Hero from "~/layout/Hero";
import Products from "~/layout/Products";

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  let res = await fetch(
    "https://fakestoreapi.com/products/category/men's clothing"
  );
  let category = await res.json();
  return { product_category: category };
};

export default function Index() {
  const data = useLoaderData();
  let { product_category } = data;
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <Header />
      <Hero />
      <Products products={product_category} />
    </div>
  );
}
