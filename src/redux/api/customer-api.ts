import { ICustomer } from '@/types';
import { mainApi } from './index'

const extendedApi = mainApi.injectEndpoints({
  endpoints: (build) => ({
    createCustomer: build.mutation<any, ICustomer>({
      query: (body) => ({
        url:'auth/client-signup',
        method: "POST",
        body
      }),
    }),
    createOtp: build.mutation<{verification_key: string}, {email:string}>({
      query: (body) => ({
        url:'auth/newotp',
        method: "POST",
        body
      }),
    }),
    verifyOtp: build.mutation<any, {email:string, verification_key:string, otp: string}>({
      query: (body) => ({
        url:'auth/verifyotp',
        method: "POST",
        body
      }),
    }),
  }),
})

export const { useCreateCustomerMutation, useCreateOtpMutation, useVerifyOtpMutation } = extendedApi;