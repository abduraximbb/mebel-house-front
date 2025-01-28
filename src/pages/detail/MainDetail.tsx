import ProductDetail from "./ProductDetail";
import { useGetProductsQuery } from "@/redux/api/product-api";
import Products from "@/components/products/Products";

const MainDetail = () => {
  const { data, isLoading, isError } = useGetProductsQuery({ limit: 10000 });

  return (
    <>
      <ProductDetail />
      {!isLoading && !isError && data && <Products data={data}/>}
    </>
  );
};

export default MainDetail;
