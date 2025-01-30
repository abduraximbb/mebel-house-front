import { RootState } from "@/redux";
import {
  decrementAmountCart,
  ICartProduct,
  incrementAmountCart,
} from "@/redux/features/cart-slice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const cart = useSelector((state: RootState) => state.cart.value);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  return (
    <div className="container">
      {cart.length ? (
        <>
          <h2>Cart</h2>
          <div>
            {cart?.map((product: ICartProduct) => (
              <div className="py-2 border-b" key={product.id}>
                <img
                  src={import.meta.env.VITE_BASE_IMAGE_URL + product.images[0]}
                  alt={product.name}
                  className="w-24"
                />
                <p>{product.name}</p>
                <p>
                  {product.price} || {product.discount}
                </p>
                <div>
                  <button
                    disabled={product.amount <= 1}
                    onClick={() => dispatch(decrementAmountCart(product))}
                    className="bg-slate-300 p-2 disabled:opacity-30"
                  >
                    -
                  </button>
                  <span className="inline-block min-w-7 text-center">
                    {product.amount}
                  </span>
                  <button
                    disabled={product.stock <= product.amount}
                    onClick={() => dispatch(incrementAmountCart(product))}
                    className="bg-slate-300 p-2 disabled:opacity-30"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => navigate("/checkout")}>CheckOut</button>
        </>
      ) : (
        <div>
          <h2>Empty</h2>
        </div>
      )}
    </div>
  );
};

export default Cart;
