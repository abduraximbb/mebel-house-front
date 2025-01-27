import { RootState } from "@/redux";
import { useToggleWishlitMutation } from "@/redux/api/wishlist-api";
import { toggleLike } from "@/redux/features/wishlist-slice";
import { IProduct } from "@/types";
import React from "react";
import { IoMdHeartEmpty, IoMdHeart  } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

const Heart = ({product}:{product: IProduct}) => {
    const [toggleWishlist] = useToggleWishlitMutation()
    const {id: clientId} = useSelector((state: RootState)=> state.user.value)
    const token = useSelector((state: RootState)=> state.token.access_token)
    const wishlist = useSelector((state: RootState)=> state.wishlist.value)
    const dispatch = useDispatch()

    

    const handleLike = ()=>{
      if(token){
        toggleWishlist({productId: product.id, clientId: Number(clientId)})
      }else{
        dispatch(toggleLike(product))
      }
    }
  return (
    <button onClick={handleLike} className="bg-white p-3 rounded-lg text-primary hover:bg-primary-light transition">
      {
        wishlist?.some((item) => item.id === product.id) ?
        <IoMdHeart className="text-xl text-primary" />
        :
        <IoMdHeartEmpty className="text-xl text-primary" />
      }
    </button>
  );
};

export default React.memo(Heart);
