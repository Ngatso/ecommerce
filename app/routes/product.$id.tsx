import { LoaderArgs, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import ImageCarousal from "~/layout/component/ImageCarousal";
export const loader: LoaderFunction = async ({
  request,
  params,
}: LoaderArgs) => {
  let { id } = params;
  let res = await fetch(`https://dummyjson.com/products/${id}`);
  let productData = await res.json();
  return { productData };
};

export default function Product() {
  let { productData: product } = useLoaderData();
  const [selectedImage, setSelectedImage] = useState(product.thumbnail);
  const handleThumbnailClick = (image) => {
    setSelectedImage(image);
  };
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <ImageCarousal images={product.images} thumbnail={selectedImage} />
          <div className="grid grid-cols-5 gap-4 mt-4">
            {product.images.map((image, index) => (
              <img
                src={image}
                alt={`Image ${index + 1}`}
                className="w-full max-h-24 object-contain"
                key={index}
                onClick={() => handleThumbnailClick(image)}
              />
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
          <div className="flex items-center mb-4">
            <span className="text-sm font-semibold text-gray-600 mr-2">
              Brand:
            </span>
            <span className="text-sm font-medium">{product.brand}</span>
          </div>
          <div className="flex items-center mb-4">
            <span className="text-sm font-semibold text-gray-600 mr-2">
              Category:
            </span>
            <span className="text-sm font-medium">{product.category}</span>
          </div>
          <div className="flex items-center mb-4">
            <span className="text-sm font-semibold text-gray-600 mr-2">
              Price:
            </span>
            <span className="text-sm font-medium">${product.price}</span>
          </div>
          <div className="flex items-center mb-4">
            <span className="text-sm font-semibold text-gray-600 mr-2">
              Rating:
            </span>
            <span className="text-sm font-medium">{product.rating}</span>
          </div>
          <div className="flex items-center mb-4">
            <span className="text-sm font-semibold text-gray-600 mr-2">
              Discount:
            </span>
            <span className="text-sm font-medium">
              {product.discountPercentage}%
            </span>
          </div>
          <div className="flex items-center mb-4">
            <span className="text-sm font-semibold text-gray-600 mr-2">
              Stock:
            </span>
            <span className="text-sm font-medium">{product.stock}</span>
          </div>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
