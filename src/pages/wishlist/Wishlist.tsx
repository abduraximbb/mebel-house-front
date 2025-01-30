import Products from "@/components/products/Products";
import { RootState } from "@/redux";
import { useGetWishlistQuery } from "@/redux/api/wishlist-api";
import { useSelector } from "react-redux";
import EmptyWishlist from "./EmptyWishlist";

const Wishlist = () => {
  const id = useSelector((state: RootState) => state.user.value.id);
  const wishlist = useSelector((state: RootState) => state.wishlist.value);
  const token = useSelector((state: RootState) => state.token.access_token);

  const { data } = useGetWishlistQuery(Number(id));
  console.log({ data: wishlist });

  return (
    <div>
      {wishlist?.length ? ( // wishlist mavjud bo'lsa
        <Products
          data={token ? data : { data: wishlist }} // Agar token bo'lsa, API ma'lumotlari, aks holda lokal wishlist
          seeMoreBtn={true}
          title="Your Wishlist"
          countProducts={4}
        />
      ) : (
        <EmptyWishlist /> // Wishlist mavjud bo'lmasa, EmptyWishlist ko'rsatiladi
      )}
    </div>
  );
};

export default Wishlist;
