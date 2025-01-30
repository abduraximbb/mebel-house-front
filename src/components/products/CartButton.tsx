import { addCart } from "@/redux/features/cart-slice";
import { IProduct } from "@/types";
import React from "react";
import { IoCartOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";

const CartButton = ({ product }: { product: IProduct }) => {
  const dispatch = useDispatch();
  return (
    <button
      onClick={() => dispatch(addCart(product))}
      className="bg-white p-2 rounded text-primary hover:bg-primary-light transition"
    >
      <IoCartOutline className="text-lg text-primary" />
    </button>
  );
};

export default React.memo(CartButton);
