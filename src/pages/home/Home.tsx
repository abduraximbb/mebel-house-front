import React from "react";
import { useGetProductsQuery } from "../../redux/api/product-api";
import Hero from "./Hero";
import Products from "../../components/products/Products";
import Browse from "./Browse";
import SwiperInfinite from "./swiper_infinite/swiper_infinite";

const Home = () => {
  const { data } = useGetProductsQuery({});
  return (
    <div>
      <Hero />
      <Browse />
      {data && <Products data={data} />}
      <SwiperInfinite/>
    </div>
  );
};

export default React.memo(Home);
