import { REGIONS } from "@/static";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useCheckTokenQuery } from "@/redux/api/customer-api";
import { useSelector } from "react-redux";
import { RootState } from "@/redux";
import { useCreateOrderMutation } from "../../redux/api/order-api";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const schema = yup
  .object({
    street: yup.string().required("Street is required"),
    region: yup.string().required("Region is required"),
    phone_number: yup.string().required("Phone number is required"),
    zipCode: yup
      .number()
      .required("Zip code is required")
      .typeError("Zip code must be a number"),
  })
  .required();

const Checkout = () => {
  const { data } = useCheckTokenQuery(null);
  const cart = useSelector((state: RootState) => state.cart.value);
  const token = useSelector((state: RootState) => state.token.access_token);
  const [createOrder] = useCreateOrderMutation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setFocus,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
    defaultValues: {
      region: "",
      street: "",
      phone_number: "",
      // zipCode: '' ,
    },
  });

  const onSubmit: SubmitHandler<any> = (address) => {
    const total_price = cart?.reduce(
      (sum, product) => sum + product.price * product.amount,
      0
    );
    let order = {
      clientId: data?.client?.id,
      address,
      order_items: cart?.map((product) => ({
        productId: product.id,
        quantity: product.amount,
      })),
      total_price,
    };

    createOrder(order);
    reset();
    return navigate("/auth/profile/self");
  };

  return !token ? (
    <Navigate replace to={"/cart"} />
  ) : (
    <div className="container max-w-2xl mx-auto mt-10 p-4 dark:bg-gray-800 dark:text-white rounded-lg">
      <h2 className="text-3xl font-semibold mb-6 text-center">Checkout</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <select
            className={`w-full p-3 border ${
              errors.region ? "border-red-500" : "border-gray-300"
            } rounded-lg bg-gray-100 dark:bg-gray-700 dark:border-gray-600 text-black dark:text-white`}
            {...register("region")}
            onFocus={() => setFocus("region")}
          >
            <option value="" disabled>
              Choose region
            </option>
            {REGIONS?.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
          {errors.region && (
            <p className="text-red-500 text-sm mt-1">{errors.region.message}</p>
          )}
        </div>

        <div>
          <input
            className={`w-full p-3 border ${
              errors.street ? "border-red-500" : "border-gray-300"
            } rounded-lg bg-gray-100 dark:bg-gray-700 dark:border-gray-600 text-black dark:text-white`}
            {...register("street")}
            type="text"
            placeholder="Street"
            onFocus={() => setFocus("street")}
          />
          {errors.street && (
            <p className="text-red-500 text-sm mt-1">{errors.street.message}</p>
          )}
        </div>

        <div>
          <input
            className={`w-full p-3 border ${
              errors.zipCode ? "border-red-500" : "border-gray-300"
            } rounded-lg bg-gray-100 dark:bg-gray-700 dark:border-gray-600 text-black dark:text-white`}
            {...register("zipCode")}
            type="number"
            placeholder="Zip Code"
            onFocus={() => setFocus("zipCode")}
          />
          {errors.zipCode && (
            <p className="text-red-500 text-sm mt-1">
              {errors.zipCode.message}
            </p>
          )}
        </div>

        <div>
          <input
            className={`w-full p-3 border ${
              errors.phone_number ? "border-red-500" : "border-gray-300"
            } rounded-lg bg-gray-100 dark:bg-gray-700 dark:border-gray-600 text-black dark:text-white`}
            {...register("phone_number")}
            type="text"
            placeholder="Phone Number"
            onFocus={() => setFocus("phone_number")}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
