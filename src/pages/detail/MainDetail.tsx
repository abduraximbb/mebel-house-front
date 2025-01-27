import ProductDetail from "./ProductDetail";
import { useGetProductsQuery } from "@/redux/api/product-api";
import RelatedProducts from "./RelatedProducts";

const MainDetail = () => {
  const { data, isLoading, isError } = useGetProductsQuery({ limit: 10000 });

  return (
    <>
      <ProductDetail />
      {!isLoading && !isError && data && <RelatedProducts data={data} />}
    </>
  );
};

export default MainDetail;
