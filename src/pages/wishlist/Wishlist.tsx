import Products from "@/components/products/Products";
import { RootState } from "@/redux";
import { useGetWishlistQuery } from "@/redux/api/wishlist-api";
import { useSelector } from "react-redux";
import EmptyWishlist from "./EmptyWishlist";
import { useCheckTokenQuery } from "../../redux/api/customer-api";
import { useEffect } from "react";

const Wishlist = () => {

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

  return (
    <>
      <Products
        data={token ? data : { data: wishlist }}
        seeMoreBtn={true}
        countProducts={Infinity}
        title={
          data?.data?.length > 0 || wishlist?.length > 0 ? (
            "Wishlist"
          ) : (
            <EmptyWishlist />
          )
        }
      />
    </>
  );
};

export default Wishlist;
