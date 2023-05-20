import { Link } from "@remix-run/react";
import ImageCarousal from "./component/ImageCarousal";
export default function Product({ item }) {
  let {
    brand,
    category,
    description,
    discountPercentage,
    id,
    images,
    price,
    rating,
    stock,
    thumbnail,
    title,
  } = item;

  return (
    <Link
      to={`/product/${id}`}
      className="max-w-md mx-auto bg-white rounded-md overflow-hidden shadow-lg"
    >
      <div className="h-72  flex items-center">
        <img
          src={thumbnail}
          className="w-full max-h-full object-contain"
          alt="random"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-600 mb-2">Brand: {brand}</p>
        <p className="text-gray-600 mb-2">Category: {category}</p>
        <p className="text-gray-600 mb-2">Rating: {rating}</p>
        <div className="flex items-center">
          <span className="text-gray-600 text-sm line-through mr-2">
            ${price}
          </span>
          <span className="text-green-600 text-lg">
            ${(price - (price * discountPercentage) / 100).toFixed(2)}
          </span>
        </div>
        <p className="text-gray-600 mb-2">Stock: {stock}</p>
      </div>
    </Link>
  );
}
