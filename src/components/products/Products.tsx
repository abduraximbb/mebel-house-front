import { memo, useState } from "react";
import { Link } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { IGetProducts, IProduct } from "@/types";
import Heart from "./Heart";

const Products = ({
  data,
  showMore,
  title
}: {
  data: IGetProducts;
  showMore: boolean;
  title:string
}) => {
  const [visibleProducts, setVisibleProducts] = useState<IProduct[]>(
    data?.data?.slice(0, 4)
  );
  
  const showMoreProducts = () => {
    const nextProducts = data?.data?.slice(
      visibleProducts.length,
      visibleProducts.length + 4
    );
    setVisibleProducts([...visibleProducts, ...nextProducts]);
  };

  const handleProductClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const productItems = data?.data?.map((product: IProduct) => (
    <div
      key={product.id}
      className="relative group overflow-hidden rounded-xl shadow-xl bg-white transform transition-all duration-300"
    >
      {/* Product Image with hover effect */}
      <div className="relative w-full h-[350px] sm:h-[300px] md:h-[320px] lg:h-[350px] block">
        <img
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:opacity-80"
          src={`${import.meta.env.VITE_BASE_IMAGE_URL}${product.images[0]}`}
          alt={product.name}
        />
        {/* Hover effect for buttons */}
        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 flex-col">
          {/* View Product Button (top position) */}
          <Link
            to={`/product/${product.id}`}
            onClick={handleProductClick}
            className="bg-slate-300 p-3 rounded-lg text-primary hover:bg-primary-light transition mb-3"
          >
            View Product
          </Link>

          {/* Other buttons: Cart, Compare, Heart */}
          <div className="flex gap-4">
            <button className="bg-white p-3 rounded-lg text-primary hover:bg-primary-light transition">
              <IoCartOutline className="text-xl text-primary" />
            </button>
            <button className="bg-white p-3 rounded-lg text-primary hover:bg-primary-light transition">
              Compare
            </button>
            <Heart product={product} />
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="py-5 px-4 bg-[#F8F9FA] transition-colors duration-300">
        <h2
          title={product.name}
          className="text-xl font-semibold text-gray-900 truncate max-[620px]:text-lg"
        >
          {product.name}
        </h2>
        <p
          title={product.description}
          className="text-sm text-[#333] mt-2 truncate max-[620px]:text-xs"
        >
          {product.description}
        </p>
        {product.discount > 0 ? (
          <div className="flex justify-between items-center mt-4">
            <strong className="text-xl text-gray-900 font-semibold ">
              {(product.price - product.discount).toLocaleString()} USD
            </strong>
            <p className="text-[#B0B0B0] text-base">
              USD <del>{product.price.toLocaleString()}</del>
            </p>
          </div>
        ) : (
          <div className=" mt-4">
            <strong className="text-xl text-gray-900 font-semibold">
              {product.price.toLocaleString()} USD
            </strong>
          </div>
        )}
      </div>
    </div>
  ));

  return (
    <div className="container my-12 px-4 max-[620px]:my-6 max-[620px]:px-2">
      {/* Section Title */}
      <h2 className="font-poppins-bold text-4xl mb-10 text-center text-gray-900">
        {title}
      </h2>

      {/* Product Grid */}
      <div className="grid grid-cols-4 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-[620px]:gap-4 max-[620px]:grid-cols-1">
        {productItems}
      </div>

      {/* See More Button */}
      {showMore && visibleProducts?.length < data?.data?.length && (
        <div className="text-center mt-8">
          <button
            onClick={showMoreProducts}
            className="px-8 py-3 bg-bg-primary text-white text-lg font-medium rounded-lg hover:bg-bg-primary transition"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default memo(Products);
