import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ISignInCustomer } from "@/types";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import {  useState } from "react";
import closeEye from "@/assets/images/close-eye.svg";
import openEye from "@/assets/images/open-eye.svg";
import { useSignInCustomerMutation } from "../../../redux/api/customer-api";
import { saveToken } from "../../../redux/features/token-slice";
import { useDispatch, useSelector } from "react-redux";
import { saveEmail } from "@/redux/features/otp-slice";
import { RootState } from "../../../redux";
import { useSetWishlistMutation } from "../../../redux/api/wishlist-api";
import { clearWishlist } from "../../../redux/features/wishlist-slice";
import { useParamsHook } from "@/hooks/useParamsHook";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Invalid email format.")
      .required("Email is required."),
    password: yup
      .string()
      .min(6, "Password must be at least 8 characters long.")
      .required("Password is required."),
  })
  .required();

const SignIn = () => {
  const navigate = useNavigate();
  const [login] = useSignInCustomerMutation(); // Updated mutation hook for login
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const wishlist = useSelector((state: RootState) => state.wishlist.value);
  const [setWishlist] = useSetWishlistMutation();
  const {getParam} = useParamsHook()


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: ISignInCustomer) => {
    login(data)
      .unwrap()
      .then((res) => {
        if (res?.access_token) {
          toast.success("Welcome back!", { position: "bottom-right" });
          dispatch(saveToken(res?.access_token));
          console.log(res?.id);
          // {clientId:40, wishlist: [9,8]}
          if (wishlist.length) {            
            setWishlist({
              clientId: res?.id,
              wishlist: wishlist.map((item) => item.id),
            })
              .unwrap()
              .then(() => {
                dispatch(clearWishlist());
              });
          }
          if (getParam("q") === "checkout") {
            return navigate("/checkout");
          } else {
            return navigate("/auth/profile/self");
          }
        } else {
          dispatch(
            saveEmail({
              email: data.email,
              verification_key: res.verification_key,
            })
          );
          navigate("/auth/otp"); // Redirect qilish
        }
      })
      .catch((err) => {
        // console.error("Login error:", err);
        const msg = err?.data?.message || "Login failed. Please try again.";
        toast.error(Array.isArray(msg) ? msg[0] : msg, {
          position: "bottom-right",
        });
      });
  };

  return (
    <section className="bg-primary-hero-image w-full h-screen bg-cover bg-fixed bg-center bg-no-repeat md:bg-top">
      <div className="bg-[#3A3A3A]/75 w-full h-full flex justify-center items-center">
        <div className="lg:w-[60%] md:w-8/12 sm:w-10/12 w-full px-4">
          <form
            className="flex flex-col gap-10 min-h-[60%] max-w-md mx-auto p-6 bg-slate-50 rounded-lg"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-3">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 sm:text-lg font-medium text-black capitalize"
                >
                  Email
                </label>
                <input
                  {...register("email")}
                  id="email"
                  placeholder="Email"
                  className="p-4 rounded-md focus:outline w-full focus:outline-gray-500 border"
                />
                {errors.email && (
                  <div className="text-red-600 font-medium text-sm text-right">
                    {errors.email.message}
                  </div>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 sm:text-lg font-medium text-black capitalize"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    id="password"
                    autoCapitalize="off"
                    placeholder="••••••••"
                    className="p-4 rounded-md focus:outline w-full focus:outline-gray-500 border"
                  />
                  <img
                    src={showPassword ? openEye : closeEye}
                    className="absolute w-6 h-6 cursor-pointer right-2.5 top-5"
                    onClick={() => setShowPassword(!showPassword)}
                    alt="Toggle password visibility"
                  />
                </div>
                {errors.password && (
                  <div className="text-red-600 font-medium text-sm text-right">
                    {errors.password.message}
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg sm:text-lg text-center bg-yellow-700 border dark:hover:bg-primary-700 dark:focus:ring-primary-800 text-sm mb-3"
              >
                <span className="block px-5 py-2.5 w-full h-full hover:translate-x-1 duration-200 ease-in-out">
                  Sign In
                </span>
              </button>
              <Link to="/" className="text-right hover:underline mb-6 mr-1">
                Back To Home
              </Link>
              <p className="text-sm text-black text-right">
                Don't have an account?{" "}
                <Link
                  to="/auth/sign-up"
                  className="font-medium text-primary-600 hover:underline ease-in-out duration-200 dark:text-primary-500 text-sm"
                >
                  Sign up here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignIn;

// is_active = true

// token

// is_active = false

// createOtp

// verification_key
