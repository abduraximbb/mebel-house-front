import React from "react";
import { useGetProductsQuery } from "../../redux/api/product-api";
import Hero from "./Hero";
import Products from "../../components/products/Products";
import Browse from "./Browse";
import SwiperInfinite from "./swiper_infinite/swiper_infinite";
import SlickRoomSlider from "./SLickRoomSlider";
import HomeLoading from "../loading/HomeLoading";

const Home = () => {
  const { data, isLoading } = useGetProductsQuery({});

  return (
    <div>
      {isLoading ? (
        <HomeLoading />
      ) : (
        <>
          <Hero />
          <Browse />
          {data && <Products data={data} showMore={true} title="Our Products"/>}
          <SlickRoomSlider />
          <SwiperInfinite />
        </>
      )}
    </div>
  );
};

export default React.memo(Home);
