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

  const createNewOtp = () => {
    createOtp({ email: email });
    setReload(!reload);
    console.log(email, reload);
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
        verification_key,
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
        <Timer
          reload={reload}
          callback={createNewOtp}
          time={120}
          className="mt-6 text-gray-500"
        />
      </Box>
    </Box>
  );
}
