import { RootState } from "@/redux";
import { useToggleCartMutation } from "@/redux/api/card-api";
import { addCart, deleteCart } from "@/redux/features/cart-slice";
import { IProduct } from "@/types";
import React, { useState } from "react";
import { IoCartOutline, IoCart } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useCheckTokenQuery } from "../../redux/api/customer-api";

const CartButton = ({ product }: { product?: IProduct }) => {
  if (!product) return null; 

  const [toggleCart] = useToggleCartMutation();
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.value) || [];
  const token = useSelector((state: RootState) => state.token.access_token);
  const { data } = useCheckTokenQuery(null, { skip: Boolean(!token) });

  const [currentCart, setCurrentCart] = useState({
    id: product.id,
    state: cart.some((item) => item.id === product.id),
    clicked: false,
  });

  const handleCart = () => {
    setCurrentCart({
      id: product.id,
      state: !currentCart.state,
      clicked: true,
    });

    if (token) {
      toggleCart({
        productId: product.id,
        clientId: Number(data?.client?.id),
      });
    } else {
      if (cart.some((item) => item.id === product.id)) {
        dispatch(deleteCart());
      } else {
        dispatch(addCart(product));
      }
    }
  };

  const cartState = currentCart.clicked
    ? currentCart.state && currentCart.id === product.id
    : cart.some((item) => item.id === product.id);

  return (
    <button
      onClick={handleCart}
      className="bg-white p-3 rounded-lg text-primary hover:bg-primary-light transition"
    >
      {cartState ? (
        <IoCart className="text-xl text-bg-primary" />
      ) : (
        <IoCartOutline className="text-xl text-black" />
      )}
    </button>
  );
};

export default React.memo(CartButton);
