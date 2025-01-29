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
        <div className="h-full flex justify-center items-center px-4">
          <form
            className="flex flex-col lg:flex-row gap-10 max-w-4xl w-full bg-slate-50 rounded-lg p-6 shadow-xl"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-4 w-full lg:w-1/2">
              <div>
                <label
                  htmlFor="full_name"
                  className="block text-sm font-medium text-black"
                >
                  Full Name
                </label>
                <input
                  {...register("full_name")}
                  id="full_name"
                  placeholder="Full Name"
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-primary-300"
                />
                {errors.full_name && (
                  <p className="text-red-600 text-xs">{errors.full_name.message}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-black"
                >
                  Email
                </label>
                <input
                  {...register("email")}
                  id="email"
                  placeholder="Email"
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-primary-300"
                />
                {errors.email && (
                  <p className="text-red-600 text-xs">{errors.email.message}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="phone_number"
                  className="block text-sm font-medium text-black"
                >
                  Phone Number
                </label>
                <input
                  {...register("phone_number")}
                  id="phone_number"
                  placeholder="+998 ** *** ** **"
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-primary-300"
                />
                {errors.phone_number && (
                  <p className="text-red-600 text-xs">{errors.phone_number.message}</p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-4 w-full lg:w-1/2">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-black"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="••••••••"
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-primary-300"
                  />
                  <img
                    src={showPassword ? openEye : closeEye}
                    className="absolute w-6 h-6 cursor-pointer right-2 top-3"
                    onClick={() => setShowPassword(!showPassword)}
                    alt="Toggle password visibility"
                  />
                </div>
                {errors.password && (
                  <p className="text-red-600 text-xs">{errors.password.message}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="confirm_password"
                  className="block text-sm font-medium text-black"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    {...register("confirm_password")}
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirm_password"
                    placeholder="••••••••"
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-primary-300"
                  />
                  <img
                    src={showConfirmPassword ? openEye : closeEye}
                    className="absolute w-6 h-6 cursor-pointer right-2 top-3"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    alt="Toggle confirm password visibility"
                  />
                </div>
                {errors.confirm_password && (
                  <p className="text-red-600 text-xs">
                    {errors.confirm_password.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg sm:text-lg text-center bg-yellow-700 border dark:hover:bg-primary-700 dark:focus:ring-primary-800 text-sm mb-3 mt-4"
              >
                <span className="block px-5 py-2.5 w-full h-full hover:translate-x-1 duration-200 ease-in-out">
                  Sign Up
                </span>
              </button>
              <p className="text-sm text-black text-left mt-3">
                Already have an account?{" "}
                <Link
                  to="/auth/sign-in"
                  className="font-medium text-primary-600 hover:underline mr-8"
                >
                  Login here
                </Link>
                <span>
                  <Link to="/" className="text-right hover:underline mb-6 mr-1">
                Back To Home{" "}
              </Link>
                </span>
              
              
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
