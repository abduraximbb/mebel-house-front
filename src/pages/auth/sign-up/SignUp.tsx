import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ICustomer } from "@/types";
import { useCreateCustomerMutation } from "@/redux/api/customer-api";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveEmail } from "@/redux/features/otp-slice";
import { useState } from "react";
import closeEye from "@/assets/images/close-eye.svg";
import openEye from "@/assets/images/open-eye.svg";

const schema = yup
  .object({
    full_name: yup.string().required("Full name is required."),
    email: yup
      .string()
      .email("Invalid email format.")
      .required("Email is required."),
    phone_number: yup.string().required("Phone number is required."),
    password: yup
      .string()
      .min(6, "Password must be at least 8 characters long.")
      .required("Password is required."),
    confirm_password: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match.")
      .required("Confirm password is required."),
  })
  .required();

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [createCustomer] = useCreateCustomerMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); 

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: ICustomer) => {
    createCustomer(data)
      .unwrap()
      .then((res) => {
        toast.success("Welcome", { position: "bottom-right" });
        dispatch(
          saveEmail({
            email: res.email,
            verification_key: res.verification_key,
          })
        );
        navigate("/auth/otp");
      })
      .catch((err) => {
        let msg = err.data.message;
        toast.error(Array.isArray(msg) ? msg[0] : msg, {
          position: "bottom-right",
        });
      });
  };

  return (
    <section className="bg-primary-hero-image w-full h-screen bg-cover bg-fixed bg-center bg-no-repeat md:bg-top">
      <div className="bg-[#3A3A3A]/75 w-full h-full">
        <div className="h-full lg:w-[60%] md:w-8/12 sm:w-10/12 flex flex-col justify-center items-center mx-auto px-4">
          <form
            className="flex xl:justify-between xl:flex-row flex-col sm:gap-10 min-h-[60%] w-full xl:mt-0 mt-5 p-6 bg-slate-50 rounded-lg"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="xl:w-6/12 flex flex-col gap-3">
              <div>
                <label
                  htmlFor="full_name"
                  className="block mb-2 sm:text-lg font-medium text-black capitalize"
                >
                  Full Name
                </label>
                <input
                  {...register("full_name")}
                  id="full_name"
                  placeholder="Full Name"
                  className="p-4 rounded-md focus:outline w-full focus:outline-gray-500 border"
                />
                {errors.full_name && (
                  <div className="text-red-600 font-medium text-sm text-right">
                    {errors.full_name.message}
                  </div>
                )}
              </div>
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
                  htmlFor="phone_number"
                  className="block mb-2 sm:text-lg font-medium text-black capitalize"
                >
                  Phone Number
                </label>
                <input
                  {...register("phone_number")}
                  id="phone_number"
                  placeholder="+998 ** *** ** **"
                  className="p-4 rounded-md focus:outline w-full focus:outline-gray-500 border"
                />
                {errors.phone_number && (
                  <div className="text-red-600 font-medium text-sm text-right">
                    {errors.phone_number.message}
                  </div>
                )}
              </div>
            </div>
            <div className="xl:w-6/12 flex flex-col gap-3">
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
              <div>
                <label
                  htmlFor="confirm_password"
                  className="block mb-2 sm:text-lg font-medium text-black capitalize"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    {...register("confirm_password")}
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirm_password"
                    placeholder="••••••••"
                    className="p-4 rounded-md focus:outline w-full focus:outline-gray-500 border"
                  />
                  <img
                    src={showConfirmPassword ? openEye : closeEye}
                    className="absolute w-6 h-6 cursor-pointer right-2.5 top-5"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    alt="Toggle confirm password visibility"
                  />
                </div>
                {errors.confirm_password && (
                  <div className="text-red-600 font-medium text-sm text-right">
                    {errors.confirm_password.message}
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg sm:text-lg text-center bg-yellow-700 border dark:hover:bg-primary-700 dark:focus:ring-primary-800 text-sm mb-3"
              >
                <span className="block px-5 py-2.5 w-full h-full hover:translate-x-1 duration-200 ease-in-out">
                  Sign Up
                </span>
              </button>
              <Link to="/" className="text-right hover:underline mb-6 mr-1">
                Back To{" "}
              </Link>
              <p className="text-sm text-black text-right">
                Already have an account?{" "}
                <Link
                  to="/auth/sign-in"
                  className="font-medium text-primary-600 hover:underline ease-in-out duration-200 dark:text-primary-500 text-sm"
                >
                  Login here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
