import { memo } from "react";
import { Link } from "react-router-dom";
import { IGetProducts, IProduct } from "@/types";
import Heart from "./Heart";
import CartButton from "./CartButton";
import Discount from "./Discount";

const Products = ({
  data,
  seeMoreBtn,
  title,
  countProducts,
}: {
  data: IGetProducts;
  seeMoreBtn: boolean;
  title: any;
  countProducts: number;
}) => {
  const productItems = data?.data?.map((product: IProduct) => (
    <div
      key={product.id}
      className="relative group overflow-hidden shadow-md bg-white transform transition-all duration-300 hover:shadow-lg"
    >
      <div className="relative w-full h-[250px] sm:h-[240px] md:h-[250px] lg:h-[260px] block overflow-hidden">
        <img
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={`${import.meta.env.VITE_BASE_IMAGE_URL}${product.images[0]}`}
          alt={product.name}
        />

        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 flex-col">
          <Link
            to={`/product/${product.id}`}
            className="bg-slate-300 px-3 py-1 rounded-lg text-primary hover:bg-primary-light transition text-sm"
          >
            View Product
          </Link>

          <div className="flex gap-2">
            <span className="bg-white p-1.5 rounded text-primary hover:bg-primary-light transition">
              <CartButton product={product} />
            </span>
            <button className="bg-white p-1.5 rounded text-primary hover:bg-primary-light transition text-xs">
              Compare
            </button>
            <Heart product={product} />
          </div>
        </div>
      </div>

      {!!product.discount?.percent && (
        <Discount percent={Number(product.discount?.percent)} />
      )}

      <div className="py-3 px-2 bg-[#F8F9FA] transition-colors duration-300">
        <h2
          title={product.name}
          className="text-base font-semibold text-gray-900 truncate max-[620px]:text-sm"
        >
          {product.name}
        </h2>
        <p
          title={product.description}
          className="text-xs text-[#333] mt-1 truncate max-[620px]:text-[11px]"
        >
          {product.description}
        </p>
        <div className="flex mt-2 items-center justify-between text-sm">
          {!!product.discount?.percent ? (
            <>
              <strong className="text-lg text-[#3A3A3A] font-poppins max-[620px]:text-base">

                {product.price} USD
              </strong>
              <p className="text-gray-500 font-poppins text-sm max-[620px]:text-xs">
                <del>
                  {" "}
                  {(
                    product.price /
                    (1 - Number(product.discount / 100))
                  ).toLocaleString()}{" "}
                  USD
                </del>
              </p>
            </>
          ) : (
            <strong className="text-lg text-[#3A3A3A] font-poppins max-[620px]:text-base">
              {product.price.toLocaleString()} USD
            </strong>
          )}
        </div>
      </div>
    </div>
  ));

  return (
    <div className="container my-10 px-4 max-[620px]:my-5 max-[620px]:px-2">
      <h2 className="font-poppins-bold text-2xl mb-6 text-center text-gray-900 max-[620px]:text-xl">
        {title}
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-3 md:gap-4">
        {productItems?.slice(0, countProducts).map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
      {seeMoreBtn && (
        <div className="text-center mt-8">
          <Link
            to="/shop"
            className="text-primary border-2 border-bg-primary bg-white px-6 py-3 text-base font-semibold hover:bg-primary hover:text-bg-primary transition"
          >
            See More
          </Link>
        </div>
      )}
    </div>
  );
};

export default memo(Products);