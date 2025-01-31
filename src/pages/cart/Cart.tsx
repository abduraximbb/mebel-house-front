// import { RootState } from "@/redux";
// import {
//   decrementAmountCart,
//   ICartProduct,
//   incrementAmountCart,
// } from "@/redux/features/cart-slice";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// const Cart = () => {
//   const cart = useSelector((state: RootState) => state.cart.value);
//   const navigate = useNavigate();

//   const dispatch = useDispatch();

//   return (
//     <div className="container">
//       {cart.length ? (
//         <>
//           <h2>Cart</h2>
//           <div>
//             {cart?.map((product: ICartProduct) => (
//               <div className="py-2 border-b" key={product.id}>
//                 <img
//                   src={import.meta.env.VITE_BASE_IMAGE_URL + product.images[0]}
//                   alt={product.name}
//                   className="w-24"
//                 />
//                 <p>{product.name}</p>
//                 <p>
//                   {product.price} || {product.discount}
//                 </p>
//                 <div>
//                   <button
//                     disabled={product.amount <= 1}
//                     onClick={() => dispatch(decrementAmountCart(product))}
//                     className="bg-slate-300 p-2 disabled:opacity-30"
//                   >
//                     -
//                   </button>
//                   <span className="inline-block min-w-7 text-center">
//                     {product.amount}
//                   </span>
//                   <button
//                     disabled={product.stock <= product.amount}
//                     onClick={() => dispatch(incrementAmountCart(product))}
//                     className="bg-slate-300 p-2 disabled:opacity-30"
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <button onClick={() => navigate("/checkout")}>CheckOut</button>
//         </>
//       ) : (
//         <div>
//           <h2>Empty</h2>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;


import { RootState } from "@/redux";
import {
  decrementAmountCart,
  ICartProduct,
  incrementAmountCart,
  deleteCart,
} from "@/redux/features/cart-slice";
import { useDispatch, useSelector } from "react-redux";
import { IoTrashOutline } from "react-icons/io5";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const cart = useSelector((state: RootState) => state.cart.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const subtotal = cart.reduce(
    (acc, product) =>
      acc +
      (product.price * product.amount) / (1 - product.discount / 100),
    0
  );

  const total = cart.reduce(
    (sum, product) => sum + product.price * product.amount,
    0
  );

  return (
    <div className="container mx-auto p-4 flex  flex-col lg:flex-row gap-6 dark:bg-zinc-900">
      <div className="w-full lg:w-2/3">
        <div className=" dark:bg-zinc-900 p-3 rounded-t-lg ">
          <table className="w-full table-auto text-left hidden md:table">
            <thead>
              <tr className="font-semibold text-base bg-[#F9F1E7] dark:bg-zinc-800">
                <th className="px-4 py-3 text-center">Product</th>
                <th className="px-4 py-3 text-center">Price</th>
                <th className="px-4 py-3 text-center">Quantity</th>
                <th className="px-4 py-3 text-center">Subtotal</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.length > 0 ? (
                cart.map((product: ICartProduct) => (
                  <tr
                    key={product.id}
                    className="border-b dark:hover:bg-zinc-900 transition"
                  >
                    <td className="px-3 py-4 flex items-center gap-3">
                      <img
                        src={
                          import.meta.env.VITE_BASE_IMAGE_URL +
                          product.images[0]
                        }
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <p className="font-semibold text-base text-black dark:text-white">
                        {product.name}
                      </p>
                    </td>
                    <td className="px-3 py-4 text-center text-black dark:text-white">
                      Rs.{product.price.toFixed(2)}
                    </td>
                    <td className="px-3 py-4 text-center">
                      <div className="flex items-center gap-2 justify-center">
                        <button
                          disabled={product.amount <= 1}
                          onClick={() =>
                            dispatch(decrementAmountCart(product))
                          }
                          className="text-xl px-2 py-1 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                          −
                        </button>
                        <span className="text-lg font-semibold w-10 dark:text-black text-center bg-white px-3 py-1 border rounded-md shadow">
                          {product.amount}
                        </span>
                        <button
                          disabled={product.stock <= product.amount}
                          onClick={() =>
                            dispatch(incrementAmountCart(product))
                          }
                          className="text-xl px-2 py-1 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="px-3 py-4 text-center text-black dark:text-white">
                      Rs.{(product.price * product.amount).toFixed(2)}
                    </td>
                    <td className="px-3 py-4 text-center">
                      <button
                        onClick={() => dispatch(deleteCart(product))}
                        className="bg-[#B88E2F] text-white p-2 rounded-md hover:bg-[#a07424] transition"
                      >
                        <IoTrashOutline size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="text-gray-500 text-lg text-center py-3 dark:text-white"
                  >
                    Your cart is empty.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="md:hidden p-4">
            {cart.length > 0 ? (
              cart.map((product: ICartProduct) => (
                <div
                  key={product.id}
                  className="border border-[#F9F1E7] dark:border-zinc-700 p-4 bg-white dark:bg-zinc-900 shadow-lg rounded-xl mb-4 flex flex-col gap-4 transition-transform "
                >
                  <div className="flex gap-6 items-center">
                    <img
                      src={
                        import.meta.env.VITE_BASE_IMAGE_URL + product.images[0]
                      }
                      alt={product.name}
                      className="w-28 h-28 object-cover rounded-lg shadow-sm"
                    />
                    <div className="flex flex-col">
                      <p className="font-semibold text-xl text-black dark:text-white">
                        {product.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Rs. {product.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Quantity:
                    </p>
                    <div className="flex items-center gap-3 bg-gray-100 dark:bg-zinc-800 px-3 py-2 rounded-lg shadow-sm">
                      <button
                        disabled={product.amount <= 1}
                        onClick={() =>
                          dispatch(decrementAmountCart(product))
                        }
                        className="text-xl px-3 py-1 rounded-lg bg-gray-200 dark:bg-zinc-700 hover:bg-gray-300 dark:hover:bg-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
                      >
                        −
                      </button>
                      <span className="text-lg font-semibold text-center w-8 dark:text-white">
                        {product.amount}
                      </span>
                      <button
                        disabled={product.stock <= product.amount}
                        onClick={() =>
                          dispatch(incrementAmountCart(product))
                        }
                        className="text-xl px-3 py-1 rounded-lg bg-gray-200 dark:bg-zinc-700 hover:bg-gray-300 dark:hover:bg-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Subtotal:
                    </p>
                    <p className="text-lg font-semibold text-black dark:text-white">
                      Rs. {(product.price * product.amount).toFixed(2)}
                    </p>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => dispatch(deleteCart(product))}
                      className="bg-[#B88E2F] text-white px-4 py-2 flex items-center gap-2 rounded-md hover:bg-red-600 transition shadow-md"
                    >
                      <IoTrashOutline size={18} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-lg text-center py-5 dark:text-white">
                Your cart is empty.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/3 bg-[#F9F1E7] dark:bg-zinc-800 p-4 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold mb-10 text-center text-black dark:text-white">
          Cart Totals
        </h3>

        <div className="flex justify-between mb-6">
          <p className="text-lg font-bold text-black dark:text-white">
            Price:
          </p>
          <p className="text-lg text-[#9F9F9F] dark:text-[#B88E2F]">
            {total.toFixed(2)} USD
          </p>
        </div>

        <div className="flex justify-between mb-6">
          <p className="text-lg font-bold text-black dark:text-white">
          Your savings:
          </p>
          <p className="text-lg text-[#B88E2F] dark:text-[#FFD700]">
            {(subtotal-total).toFixed(2)} USD
          </p>
        </div>

        <div
          onClick={() => navigate("/checkout")}
          className="flex justify-center pt-10"
        >
          <button
            className="w-full py-3 text-lg font-semibold transition-all duration-300 border rounded-lg shadow-md text-white bg-bg-primary hover:opacity-85 active:scale-95 
           dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-500 dark:text-gray-200"
          >
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
