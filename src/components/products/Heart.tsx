import { RootState } from "@/redux";
import { useToggleWishlitMutation } from "@/redux/api/wishlist-api";
import { toggleLike } from "@/redux/features/wishlist-slice";
import { IProduct } from "@/types";
import React, { useState } from "react";
import { IoMdHeartEmpty, IoMdHeart  } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useCheckTokenQuery } from "../../redux/api/customer-api";

const Heart = ({product}:{product: IProduct}) => {
    const [toggleWishlist] = useToggleWishlitMutation()
    const dispatch = useDispatch()
    const wishlist = useSelector((state: RootState)=> state.wishlist.value)
    const token = useSelector((state: RootState)=> state.token.access_token)
    const {data} = useCheckTokenQuery(null, {skip: Boolean(!token)})
    const initialState = {
      id:0,
      state: product?.isLike ?? false,
      clicked: false
    };
    const [currentLiked, setCurrentLiked] = useState<{
      id: number,
      state: boolean,
      clicked: boolean
    }>(initialState);
    

    const handleLike = () => {
      setCurrentLiked({
        id: product?.id,
        state: !currentLiked.state,
        clicked: true,
      });
      if (token) {
        toggleWishlist({
          productId: product.id,
          clientId: Number(data?.client?.id),
        });
      } else {
        dispatch(toggleLike(product));
      }
    };

    const heartState = currentLiked.clicked
      ? currentLiked.state && currentLiked.id === product.id
      : product?.isLike;
  return (
    <button
      onClick={handleLike}
      className="bg-white p-3 rounded-lg text-primary hover:bg-primary-light transition"
    >
      {/* {
        wishlist?.some((item) => item.id === product.id) ?
        <IoMdHeart className="text-xl text-primary" />
        :
        <IoMdHeartEmpty className="text-xl text-primary" />
      } */}

      {token ? (
        heartState ? (
          <IoMdHeart className="text-xl text-bg-primary" />
        ) : (
          <IoMdHeartEmpty />
        )
      ) : wishlist?.some((item) => item.id === product.id) ? (
        <IoMdHeart className="text-xl text-bg-primary" />
      ) : (
        <IoMdHeartEmpty />
      )}
    </button>
  );
};

export default React.memo(Heart);
