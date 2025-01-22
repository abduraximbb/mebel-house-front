import { memo } from "react";
import { IGetProducts, IProduct } from "../../types";

const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

const Products = ({ data }: { data: IGetProducts }) => {
  
  const productItems = data?.data?.map((product: IProduct) => (
    <div
      key={product.id}
      className="relative group overflow-hidden rounded-lg shadow-md"
    >
      <div className="relative w-full h-[301px] max-[620px]:h-[240px] max-[430px]:h-[200px]">
        <img
          className="w-full h-full bg-no-repeat bg-center bg-cover"
          src={`${import.meta.env.VITE_BASE_IMAGE_URL}${product.images[0]}`}
          alt={product.name}
        />
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <button className="bg-white text-black px-4 py-2 rounded-md">
          Add to cart
        </button>
      </div>
      <div className="py-4 px-4 bg-[#F4F5F7] transition-colors duration-300">
        <h2
          title={capitalize(product.name)}
          className="line-clamp-1 text-[24px] font-semibold leading-8 max-[620px]:text-lg"
        >
          {capitalize(product.name)}
        </h2>
        <p
          title={product.description}
          className="line-clamp-1 text-[#898989] text-lg max-[620px]:text-sm"
        >
          {product.description}
        </p>
        <strong className="text-[#3A3A3A] text-[20px] leading-8 font-semibold max-[620px]:text-[15px]">
          {product.price.toLocaleString()} USD
        </strong>
      </div>
    </div>
  ));

  return (
    <div className="container my-14 max-[620px]:my-4">
      <h2 className="font-poppins-bold text-[40px] mb-8 text-center max-[620px]:text-2xl">
        Our products
      </h2>
      <div className="grid grid-cols-4 gap-8 max-[1240px]:grid-cols-3 max-[990px]:grid-cols-2 max-[620px]:gap-2">
        {productItems}
      </div>
    </div>
  );
};

export default memo(Products);
