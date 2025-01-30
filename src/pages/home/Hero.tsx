import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="bg-hero-image w-full bg-fixed bg-center bg-no-repeat bg-cover md:bg-top font-Poppins h-screen flex items-center lg:justify-end justify-center px-3 lg:px-[58px]">
      <div className="bg-[#FFF3E3] border-r-8 shadow-lg p-6 md:p-10 max-w-lg w-full lg:w-auto">
        <span className="font-medium tracking-[3px] text-sm md:text-base">New Arrival</span>
        <h1 className="pt-1 text-[#B88E2F] font-bold text-2xl md:text-4xl lg:text-[52px] lg:leading-[65px] my-4">
          Discover Our New Collection
        </h1>
        <p className="text-[#333333] text-sm md:text-base lg:text-[18px] font-medium mb-6 leading-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
        </p>
        <Link
          to="/shop"
          className="bg-[#B88E2F] uppercase font-bold text-sm md:text-base px-6 py-3 md:py-4 rounded-md text-white shadow-md hover:bg-[#A67C1D] transition duration-300"
        >
          Buy Now
        </Link>
      </div>
    </section>
  );
};

export default Hero;
