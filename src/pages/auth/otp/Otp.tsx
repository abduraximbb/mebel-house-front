import * as React from "react";
import { Box } from "@mui/system";
import { CircularProgress, Typography } from "@mui/material";
import {
  useCreateOtpMutation,
  useVerifyOtpMutation,
} from "@/redux/api/customer-api";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux";
import { saveToken } from "@/redux/features/token-slice";
import Timer from "./Timer";
import { clearOtp } from "@/redux/features/otp-slice";
import OTP from "./OtpElement";

export default function OTPInput() {
  const { email, verification_key } = useSelector(
    (state: RootState) => state.otp
  );
  const dispatch = useDispatch();

  const [otp, setOtp] = React.useState("");
  const [reload, setReload] = React.useState(true);
  const [verifyOtp, { isLoading, isError, isSuccess }] = useVerifyOtpMutation();
  const [createOtp, { isLoading: otpLoading, isError: otpError, error }] =
    useCreateOtpMutation();
  const navigate = useNavigate();

  // const createNewOtp = () => {
  //   createOtp({ email: email });
  //   setReload(!reload);
  //   // console.log(email, reload);
  // };

    const handleResendOtp = () => {
      createOtp({ email })
        .unwrap()
        .then((res) => {
          sessionStorage.setItem("verification_key", res.verification_key);
          setReload(!reload);
        })
        .catch((err) => {
          console.error(err);
        });
    };

  React.useEffect(() => {
    // createOtp({ email: email });
    return () => {
      dispatch(clearOtp());
    };
  }, []);

  React.useEffect(() => {
    if (otp.length >= 4) {
      verifyOtp({
        email,
        otp,
        verification_key: String(sessionStorage.getItem('verification_key')),
      })
      .unwrap()
      .then((res) => {
        setTimeout(() => {
          dispatch(clearOtp());
        }, 300);
        dispatch(saveToken(res.access_token));
        navigate("/auth/profile");
      });
    }
  }, [otp]);

  return !email ? (
    <Navigate replace to={"/auth/sign-up"} />
  ) : (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        justifyContent: "center",
        gap: 2,
      }}
    >
      <Box
        sx={{
          boxShadow: "0px 0px 10px #0002",
          borderRadius: "10px",
          py: "50px",
          maxWidth: "600px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" component="h2" sx={{ mb: "10px" }}>
          Enter verification code
        </Typography>
        {(error as any)?.status === 401 ? (
          <p className=" text-red-500 mb-6">
            Your email is not correct. Please check again ({email})
          </p>
        ) : (
          <>
            <p className=" text-gray-500 mb-6">
              Your code was sent to your via email ({email})
            </p>
          </>
        )}
        <OTP
          error={isError}
          success={isSuccess}
          loading={isLoading || otpLoading || otpError}
          separator={<span></span>}
          value={otp}
          onChange={setOtp}
          length={4}
        />
        {(error as any)?.status === 401 && (
          <Link to="/auth/sign-up" className="mt-6">
            Go back
          </Link>
        )}
        {otpLoading && (
          <div className="mt-6">
            <CircularProgress sx={{ color: "#999" }} size={30} />
          </div>
        )}
        {/* <Timer
          reload={reload}
          callback={createNewOtp}
          time={120}
          className="mt-6 text-gray-500"
        /> */}
        <Timer
          time={120}
          callback={handleResendOtp}
          reload={reload}
          className="mt-6 text-gray-500"
        />
      </Box>
    </Box>
  );
}



// import React, { useState } from "react";
// import { Box } from "@mui/system";
// import { CircularProgress, Typography } from "@mui/material";
// import {
//   useCreateOtpMutation,
//   useVerifyOtpMutation,
// } from "@/redux/api/customer-api";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "@/redux";
// import { saveToken } from "@/redux/features/token-slice";
// import Timer from "./Timer";
// import { clearOtp } from "@/redux/features/otp-slice";
// import OTP from "./OtpElement";

// const OTPInput: React.FC = () => {
//   const { email, verification_key } = useSelector(
//     (state: RootState) => state.otp
//   );
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [otp, setOtp] = useState("");
//   const [reload, setReload] = useState(false);

//   const [verifyOtp, { isLoading, isError, isSuccess }] = useVerifyOtpMutation();
//   const [createOtp, { isLoading: otpLoading, isError: otpError }] =
//     useCreateOtpMutation();

//   const handleOtpChange = (value: string) => {
//     setOtp(value);
//   };

//   const handleOtpSubmit = () => {
//     verifyOtp({ email, verification_key, otp })
//       .unwrap()
//       .then((res) => {
//         dispatch(saveToken({ token: res.token }));
//         dispatch(clearOtp());
//         navigate("/");
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   };

  // const handleResendOtp = () => {
  //   createOtp({ email })
  //     .unwrap()
  //     .then((res) => {
  //       sessionStorage.setItem("verification_key", res.verification_key);
  //       setReload(!reload);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };

//   if (!email || !verification_key) {
//     return <Navigate to="/auth/sign-up" />;
//   }

//   return (
//     <Box
//       sx={{
//         maxWidth: 400,
//         margin: "auto",
//         textAlign: "center",
//         padding: "1.5rem",
//         border: "1px solid #ddd",
//         borderRadius: "8px",
//       }}
//     >
//       <Typography variant="h5" mb={2}>
//         Verify OTP
//       </Typography>
//       <Typography variant="body1" mb={4}>
//         We have sent a verification code to your email: <b>{email}</b>
//       </Typography>
//       <OTP value={otp} onChange={handleOtpChange} />
//       <button
//         onClick={handleOtpSubmit}
//         disabled={isLoading || otp.length < 6}
//         className="btn btn-primary mt-4 w-full"
//       >
//         {isLoading ? <CircularProgress size={20} /> : "Submit"}
//       </button>
//       {isError && (
//         <Typography color="error" mt={2}>
//           Invalid OTP. Please try again.
//         </Typography>
//       )}
//       <Timer time={60} callback={handleResendOtp} reload={reload} />
//       {otpLoading && (
//         <Typography variant="body2" mt={2}>
//           Resending OTP...
//         </Typography>
//       )}
//       {otpError && (
//         <Typography color="error" mt={2}>
//           Failed to resend OTP. Please try again.
//         </Typography>
//       )}
//       <Link to="/auth/sign-up" className="text-sm text-blue-500 mt-4 block">
//         Back to Sign Up
//       </Link>
//     </Box>
//   );
// };

// export default OTPInput;
