import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IProduct } from "@/types";
import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaFacebook,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useGetCategoryByIdQuery } from "@/redux/api/category-api";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const { data: category } = useGetCategoryByIdQuery(product?.categoryId, {
    skip: !product?.categoryId,
  });

  useEffect(() => {
    window.scrollTo({behavior:"smooth", top:0,left:0});
  }, [id,product]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}product/${id}`
        );
        const productData = await response.json();

        if (productData && productData.id) {
          setProduct(productData);
          setSelectedImage(
            `${import.meta.env.VITE_BASE_IMAGE_URL}${productData.images[0]}`
          );
        } else {
          throw new Error("No product data found in response");
        }
      } catch (error) {
        console.error("Failed to fetch product details:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const renderRating = (rating: number): JSX.Element => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center text-yellow-500">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} />
        ))}
        {hasHalfStar && <FaStarHalfAlt />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={`empty-${i}`} />
        ))}
      </div>
    );
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <motion.div
      className="container mx-auto my-10 px-4"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >







      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left Section */}
        <div className="flex flex-col space-y-6">
  {/* Thumbnail Images with Horizontal Scroll */}
  <div className="overflow-x-auto flex space-x-1 pb-2 scrollbar-hide">
    <div className="flex space-x-1 w-fit min-w-[500px] px-1">
      {product.images.map((img, index) => (
        <img
          key={index}
          src={`${import.meta.env.VITE_BASE_IMAGE_URL}${img}`}
          alt={`Thumbnail ${index + 1}`}
          className={`w-24 h-24 object-cover rounded-md cursor-pointer border-2 hover:border-blue-500 transition-all duration-200 ${
            selectedImage.includes(img) ? "border-blue-500" : "border-gray-300"
          }`}
          onClick={() =>
            setSelectedImage(`${import.meta.env.VITE_BASE_IMAGE_URL}${img}`)
          }
        />
      ))}
    </div>
  </div>

  {/* Main Image */}
  <div className="overflow-hidden rounded-xl shadow-lg">
    <img
      src={selectedImage}
      alt={product.name}
      className="w-full h-[500px] object-cover"
    />
  </div>
</div>





        

        <div>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-black">
            {product.name}
          </h1>
          <p className="text-2xl text-gray-500 mt-2">
            {product.discount > 0
              ? `RS. ${(product.price - product.discount).toLocaleString()}`
              : `RS. ${product.price.toLocaleString()}`}
          </p>

          <div className="mt-4 flex items-center space-x-2">
            {renderRating(product.avg_rating)}
            <span className="text-gray-600 text-sm">
              ({product.avg_rating})
            </span>
          </div>

          <p className="text-gray-700 dark:text-black mt-4">
            {product.description}
          </p>

          <div className="mt-6">
            <span className="font-semibold">Colors:</span>
            <div className="flex items-center space-x-3 mt-3">
              {product.colors.map((color, index) => (
                <div
                  key={index}
                  className="w-8 h-8 rounded-full border border-gray-300"
                  style={{ backgroundColor: color }}
                ></div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center space-x-6">
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                className="px-4 py-2 text-lg font-semibold hover:bg-gray-100"
                onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
              >
                -
              </button>
              <span className="px-4 text-lg font-semibold">{quantity}</span>
              <button
                className="px-4 py-2 text-lg font-semibold hover:bg-gray-100"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                +
              </button>
            </div>
            <button className="px-6 py-3 bg-black text-white rounded-lg shadow-lg hover:bg-gray-800">
              Add to Cart
            </button>
            <button className="px-6 py-3 bg-gray-100 border border-gray-300 rounded-lg shadow-lg hover:bg-gray-200">
              + Compare
            </button>
          </div>

          <div className="mt-8">
            <div>
              <h3 className="font-semibold text-base text-[#9F9F9F]">
                Tags: {product.tags}
              </h3>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold text-base text-[#9F9F9F]">
                Category: {category?.name}
              </h3>
            </div>
            <div>
              <div className="flex space-x-4 mt-3">
                <h3 className="font-semibold text-base text-[#9F9F9F]">
                  Share:
                </h3>
                <FaFacebook
                  className="text-xl text-blue-600 cursor-pointer hover:scale-110"
                  onClick={() =>
                    window.open(
                      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                        window.location.href
                      )}`,
                      "_blank"
                    )
                  }
                />
                <FaLinkedin
                  className="text-xl text-blue-700 cursor-pointer hover:scale-110"
                  onClick={() =>
                    window.open(
                      `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                        window.location.href
                      )}`,
                      "_blank"
                    )
                  }
                />
                <FaTwitter
                  className="text-xl text-blue-400 cursor-pointer hover:scale-110"
                  onClick={() =>
                    window.open(
                      `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                        window.location.href
                      )}`,
                      "_blank"
                    )
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>







      

      <div className="mt-12 space-y-6">
  <div className="flex justify-center space-x-10 border-b-2 border-gray-300 pb-3">
    <button
      className={`text-lg font-semibold pb-2 transition-colors duration-300 ${
        activeTab === "description"
          ? "text-black border-b-2 border-black"
          : "text-gray-500 hover:text-black"
      }`}
      onClick={() => setActiveTab("description")}
    >
      Description
    </button>
    <button
      className={`text-lg font-semibold pb-2 transition-colors duration-300 ${
        activeTab === "additionalInfo"
          ? "text-black border-b-2 border-black"
          : "text-gray-500 hover:text-black"
      }`}
      onClick={() => setActiveTab("additionalInfo")}
    >
      Additional Information
    </button>
    <button
      className={`text-lg font-semibold pb-2 transition-colors duration-300 ${
        activeTab === "reviews"
          ? "text-black border-b-2 border-black"
          : "text-gray-500 hover:text-black"
      }`}
      onClick={() => setActiveTab("reviews")}
    >
      Reviews
    </button>
  </div>

  <div className="space-y-4">
    {activeTab === "description" && (
      <div className="bg-white p-4 rounded-lg shadow-lg text-gray-600">
        <h3 className="text-xl font-semibold mb-3">Product Description</h3>
        <p>{product.description}</p>
      </div>
    )}

    {activeTab === "additionalInfo" && (
      <div className="bg-white p-4 rounded-lg shadow-lg text-gray-600">
        <h3 className="text-xl font-semibold mb-3">Additional Information</h3>
        <p>
          <strong>Name:</strong> {product.name}
        </p>
        <p>
          <strong>Colors:</strong> {product.colors.join(", ")}
        </p>
        <p>
          <strong>Price:</strong> {product.price.toLocaleString()} USD
        </p>
        <p>
          <strong>Rating:</strong> {product.avg_rating}
        </p>
        <p>
          <strong>Tags:</strong> {product.tags.join(", ")}
        </p>
        <p>
          <strong>Stock:</strong> {product.stock}
        </p>
      </div>
    )}

    {activeTab === "reviews" && (
      <div className="bg-white p-4 rounded-lg shadow-lg text-gray-600">
        <h3 className="text-xl font-semibold mb-3">Product Reviews</h3>
        <p>
          <strong>Reviews:</strong> No reviews yet. Be the first to review
          this product!
        </p>
      </div>
    )}
  </div>
</div>


     <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {product.images.slice(0, 2).map((img, index) => (
          <img
            key={index}
            src={`${import.meta.env.VITE_BASE_IMAGE_URL}${img}`}
            alt={`Product Image ${index + 1}`}
            className="w-full h-[450px] object-cover rounded-lg shadow-xl"
          />
        ))}
      </div>




    </motion.div>
  );
};

export default ProductDetail;
