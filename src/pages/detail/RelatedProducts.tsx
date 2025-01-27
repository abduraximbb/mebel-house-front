import { useState } from "react";
import { Link } from "react-router-dom";
import { IGetProducts, IProduct } from "@/types";
import { IoCartOutline } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";

const RelatedProducts = ({ data }: { data: IGetProducts }) => {
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

  return (
    <div className="container mx-auto my-16 px-6">
      <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-10">
        Discover More Related Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {visibleProducts.map((product: IProduct) => (
          <div
            key={product.id}
            className="relative group overflow-hidden rounded-xl shadow-xl bg-white transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
         
            <Link to={`/product/${product.id}`} onClick={handleProductClick}>
              <div className="relative w-full h-[350px] sm:h-[300px] md:h-[320px] lg:h-[350px] block">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:opacity-80"
                  src={`${import.meta.env.VITE_BASE_IMAGE_URL}${product.images[0]}`}
                  alt={product.name}
                />
         
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 flex-col">
          
                  <Link
                    to={`/product/${product.id}`}
                    className="bg-white p-3 rounded-full text-primary hover:bg-primary-light transition mb-3"
                  >
                    View Product
                  </Link>

                  <div className="flex gap-4">
                    <button className="bg-white p-3 rounded-full text-primary hover:bg-primary-light transition">
                      <IoCartOutline className="text-xl text-primary" />
                    </button>
                    <button className="bg-white p-3 rounded-full text-primary hover:bg-primary-light transition">
                      Compare
                    </button>
                    <button className="bg-white p-3 rounded-full text-primary hover:bg-primary-light transition">
                      <IoMdHeartEmpty className="text-xl text-primary" />
                    </button>
                  </div>
                </div>
              </div>
            </Link>

            
            <div className="py-5 px-4 bg-[#F8F9FA] transition-colors duration-300">
              <h3
                title={product.name}
                className="text-xl font-semibold text-gray-900 dark:text-black truncate max-[620px]:text-lg"
              >
                {product.name}
              </h3>
              <p
                title={product.description}
                className="text-sm text-[#333] dark:text-[#333] mt-2 truncate max-[620px]:text-xs"
              >
                {product.description}
              </p>
              <strong className="text-xl text-gray-900 dark:text-black mt-4 font-semibold">
                {product.price.toLocaleString()} USD
              </strong>
            </div>
          </div>
        ))}
      </div>
      {visibleProducts.length < data?.data?.length && (
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

export default RelatedProducts;
