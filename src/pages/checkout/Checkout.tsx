import { REGIONS } from "@/static";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useCheckTokenQuery } from "@/redux/api/customer-api";
import { useSelector } from "react-redux";
import { RootState } from "@/redux";

const schema = yup
  .object({
    street: yup.string().required(),
    region: yup.string().required(),
    zipCode: yup.number().required(),
  })
  .required();

const Checkout = () => {
  const { data } = useCheckTokenQuery(null);
  const cart = useSelector((state: RootState) => state.cart.value);

  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (address: any) => {
    // const totalPrice = cart?.reduce((sum, product)=> sum + (product.price * product.amount) ,0)
    const totalPrice = cart?.reduce(
      (sum, product) =>
        sum +
        ((product.price * (100 - product.discount)) / 100) * product.amount,
      0
    );
    let order = {
      clientId: data?.client?.id,
      address,
      orderItems: cart?.map((product) => ({
        productId: product.id,
        quantity: product.amount,
      })),
      totalPrice,
    };
    console.log(order);
  };

  return (
    <div className="container">
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit(onSubmit)} action="">
        <input className="border" {...register("street")} type="text" />
        <select className="border" {...register("region")} name="" id="">
          <option value="" disabled>
            {" "}
            Choose region
          </option>
          {REGIONS?.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
        <input className="border" {...register("zipCode")} type="number" />
        <button>Order</button>
      </form>
    </div>
  );
};

export default Checkout;
