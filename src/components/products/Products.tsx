import { memo } from "react";
import { Link } from "react-router-dom";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { IGetProducts, IProduct } from "@/types";

const Products = ({
  data,
  seeMoreBtn,
  title
}: {
  data: IGetProducts;
  seeMoreBtn: boolean;
  title:string
}) => {
  console.log("seeMoreBtn", seeMoreBtn);
  
  const productItems = data?.data?.map((product: IProduct) => (
    <div
      key={product.id}
      className="relative group overflow-hidden rounded-lg shadow-md bg-white transform transition-all duration-300 hover:shadow-lg"
    >
      <div className="relative w-full h-[270px] sm:h-[250px] md:h-[260px] lg:h-[270px] block overflow-hidden">
        <img
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={`${import.meta.env.VITE_BASE_IMAGE_URL}${product.images[0]}`}
          alt={product.name}
        />

        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 flex-col">
          <Link
            to={`/product/${product.id}`}
            className="bg-slate-300 p-2 rounded-lg text-primary hover:bg-primary-light transition mb-3"
          >
            View Product
          </Link>

          <div className="flex gap-3">
            <button className="bg-white p-2 rounded text-primary hover:bg-primary-light transition">
              <IoCartOutline className="text-lg text-primary" />
            </button>
            <button className="bg-white p-2 rounded text-primary hover:bg-primary-light transition">
              Compare
            </button>
            <button className="bg-white p-2 rounded text-primary hover:bg-primary-light transition">
              <IoMdHeartEmpty className="text-lg text-primary" />
            </button>
          </div>
        </div>
      </div>

      <div className="py-4 px-3 bg-[#F8F9FA] transition-colors duration-300">
        <h2
          title={product.name}
          className="text-lg font-semibold text-gray-900 truncate max-[620px]:text-sm"
        >
          {product.name}
        </h2>
        <p
          title={product.description}
          className="text-sm text-[#333] mt-2 truncate max-[620px]:text-xs"
        >
          {product.description}
        </p>
        <strong className="text-lg text-gray-900 mt-3 font-semibold">
          {product.price.toLocaleString()} USD
        </strong>
      </div>
    </div>
  ));

  return (
    <div className="container my-12 px-4 max-[620px]:my-6 max-[620px]:px-2">
      <h2 className="font-poppins-bold text-3xl mb-8 text-center text-gray-900">
        {title}
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-4 md:gap-4">
        {productItems.slice(0, 8).map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
      {seeMoreBtn && (
        <div className="text-center mt-10">
          <Link
            to="/shop"
            className="text-primary border-2 border-bg-primary bg-white px-8 py-4 text-lg font-semibold hover:bg-primary hover:text-bg-primary transition"
          >
            See More
          </Link>
        </div>
      )}
    </div>
  );
};

export default memo(Products);
