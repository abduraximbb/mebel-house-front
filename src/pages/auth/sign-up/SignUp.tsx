import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ICustomer } from "@/types";
import {
  useCreateCustomerMutation,
  useCreateOtpMutation,
} from "@/redux/api/customer-api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveEmail } from "@/redux/features/otp-slice";

// Validation schema with password confirmation logic
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
      .min(6, "Password must be at least 6 characters long.")
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
  const [createCustomer, { isLoading }] = useCreateCustomerMutation();
  const [createOtp, { isLoading: otpLoading }] = useCreateOtpMutation();

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
        // Display success toast
        toast.success("Welcome! Please verify your email.", {
          position: "bottom-right",
        });
        navigate("/auth/otp");
        // Save email and verification_key to Redux store
        dispatch(
          saveEmail({
            email: res.email,
            verification_key: res.verification_key,
          })
        );

        // // Trigger OTP creation and navigate to OTP page
        // createOtp({ email: res.email })
        //   .unwrap()
        //   .then(() => {
        //     navigate("/auth/otp");
        //   })
        //   .catch((otpErr) => {
        //     const otpMsg =
        //       otpErr.data?.message || "Failed to send OTP. Try again.";
        //     toast.error(otpMsg, { position: "bottom-right" });
        //   });
      })
      .catch((err) => {
        const errMsg = err.data?.message || "Sign-up failed. Please try again.";
        toast.error(Array.isArray(errMsg) ? errMsg[0] : errMsg, {
          position: "bottom-right",
        });
      });
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-1 md:space-y-2"
              action="#"
            >
              <div>
                <label
                  htmlFor="full_name"
                  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Full name
                </label>
                <input
                  {...register("full_name")}
                  type="text"
                  name="full_name"
                  id="full_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Full name"
                />
                <p className="text-red-500 text-sm">
                  {errors.full_name?.message}
                </p>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  {...register("email")}
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Email"
                />
                <p className="text-red-500 text-sm">{errors.email?.message}</p>
              </div>
              <div>
                <label
                  htmlFor="phone_number"
                  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Phone number
                </label>
                <input
                  {...register("phone_number")}
                  type="text"
                  name="phone_number"
                  id="phone_number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Phone number"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  {...register("password")}
                  type="password"
                  name="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Password"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="confirm_password"
                  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  {...register("confirm_password")}
                  type="password"
                  name="confirm_password"
                  id="confirm_password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Confirm password"
                  required
                />
              </div>
              <div>
                <button
                  disabled={isLoading || otpLoading}
                  className="p-2.5 bg-bg-primary w-full text-white rounded-lg disabled:opacity-70"
                >
                  {isLoading || otpLoading ? "Loading..." : "Sign up"}
                </button>
              </div>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <a
                  href="#"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
