import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative bg-hero-image bg-cover bg-center font-poppins h-[716px] lg:h-[650px] md:h-[500px] sm:h-[400px] max-sm:h-[320px]">
      <div className="absolute inset-0 bg-black opacity-0 dark:opacity-50"></div>
      <div className="flex items-center container justify-end max-lg:justify-center h-full relative z-10">
        <div className="text-start bg-white dark:bg-zinc-900 dark:bg-opacity-75 bg-opacity-70 p-8 max-sm:p-4 rounded-lg max-w-lg lg:max-w-md md:max-w-sm sm:max-w-xs max-sm:max-w-[90%]">
          <h4 className="text-sm text-gray-400 uppercase mb-4 max-sm:text-xs max-sm:mb-2">
            New Arrival
          </h4>
          <h1 className="text-5xl lg:text-4xl md:text-3xl sm:text-2xl max-sm:text-xl leading-[65px] lg:leading-[50px] md:leading-[40px] sm:leading-[35px] max-sm:leading-[30px] font-bold text-yellow-600 mb-6 max-sm:mb-3">
            Discover Our New Collection
          </h1>
          <p className="text-gray-400 mb-6 text-xl lg:text-lg md:text-base sm:text-sm max-sm:text-xs max-sm:mb-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis.
          </p>
          <Link to="/shop"
          className="bg-[#B88E2F] uppercase font-bold text-sm md:text-base px-6 py-3 md:py-4 rounded-md text-white shadow-md hover:bg-[#A67C1D] transition duration-300">
          Buy Now
        </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;