import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ICustomer } from "@/types";
import { useCreateCustomerMutation } from "@/redux/api/customer-api";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveEmail } from "@/redux/features/otp-slice";
import { FaArrowLeft } from "react-icons/fa";

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
  // const [createOtp, { isLoading: otpLoading }] = useCreateOtpMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: ICustomer) => {
    console.log(data);

    createCustomer(data)
      .unwrap()
      .then((res) => {
        toast.success("Welcome", { position: "bottom-right" });
        dispatch(
          saveEmail({
            email: res.email,
            verification_key: res.verification_key, // mana shu yerni tekshiring
          })
        );
        navigate("/auth/otp");
        // createOtp({ email: data.email })
        //   .unwrap()
        //   .then(() => {
        //     navigate("/auth/otp");
        //   });
      })
      .catch((err) => {
        let msg = err.data.message;
        console.log(msg);

        toast.error(Array.isArray(msg) ? msg[0] : msg, {
          position: "bottom-right",
        });
      });
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-0 relative">
        <Link to={"/"} className="absolute top-6 left-6 text-xl">
          <FaArrowLeft />
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-[800px] xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign up
            </h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-1 md:space-y-2"
              action="#"
            >
              <div className="grid  sm:grid-cols-2 gap-3">
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
                    placeholder="First name"
                  />
                  {errors.full_name?.message && (
                    <p className="text-red-500 text-sm">
                      {errors.full_name?.message}
                    </p>
                  )}
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
                  {errors.email?.message && (
                    <p className="text-red-500 text-sm">
                      {errors.email?.message}
                    </p>
                  )}
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
                  />
                  {errors.phone_number?.message && (
                    <p className="text-red-500 text-sm">
                      {errors.phone_number?.message}
                    </p>
                  )}
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
                    autoComplete="off"
                    type="password"
                    name="password"
                    id="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Password"
                  />
                  {errors.password?.message && (
                    <p className="text-red-500 text-sm">
                      {errors.password?.message}
                    </p>
                  )}
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
                    autoComplete="off"
                    type="password"
                    name="confirm_password"
                    id="confirm_password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Confirm password"
                  />
                  {errors.confirm_password?.message && (
                    <p className="text-red-500 text-sm">
                      {errors.confirm_password?.message}
                    </p>
                  )}
                </div>
              </div>

              {/* <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required/>
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                      </div>
                  </div> */}

              <div>
                <button
                  disabled={isLoading}
                  className="p-2.5 bg-bg-primary w-full text-white rounded-lg disabled:opacity-70"
                >
                  {isLoading ? "Loading..." : "Sign up"}
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
