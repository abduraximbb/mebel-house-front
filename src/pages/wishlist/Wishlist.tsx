import Products from "@/components/products/Products";
import { RootState } from "@/redux";
import { useGetWishlistQuery } from "@/redux/api/wishlist-api";
import { useSelector } from "react-redux";
import EmptyWishlist from "./EmptyWishlist";
import { useCheckTokenQuery } from "../../redux/api/customer-api";
import { useEffect } from "react";

const Wishlist = () => {
  // const id = useSelector((state: RootState) => state.user.value.id);
  const wishlist = useSelector((state: RootState) => state.wishlist.value);
  const token = useSelector((state: RootState) => state.token.access_token);
  const { data: tokenData } = useCheckTokenQuery(null, {
    skip: Boolean(!token),
  });
  const { data } = useGetWishlistQuery(Number(tokenData?.client?.id), {
    skip: Boolean(!tokenData),
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  console.log(tokenData);

  return (
    <>
      <Products
        data={token ? data : { data: wishlist }}
        seeMoreBtn={true}
        countProducts={Infinity}
        title={
          data?.data?.length > 0 || wishlist?.length > 0 ? (
            "Yours like products"
          ) : (
            <EmptyWishlist />
          )
        }
      />
      <h2>asd</h2>
    </>
  );
};

export default Wishlist;
