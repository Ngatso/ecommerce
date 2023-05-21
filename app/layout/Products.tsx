import Product from "./Product";

export default function Products({ data }) {
  const { products } = data;

  return (
    <div className="max-w-[70vw] m-auto grid grid-cols-1 gap-4 mt-8 lg:mt-16 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {products.slice(0, 5).map((item) => {
        return <Product item={item} key={item.id} />;
      })}
    </div>
  );
}
