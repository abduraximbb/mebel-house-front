import { IGetProducts, IProduct, IProductQuery } from "@/types";
import { mainApi } from "./index";

const extendedApi = mainApi.injectEndpoints({
  endpoints: (build) => ({
    toggleWishlit: build.mutation<any, {productId: number, clientId: number}>({
      query: (body) => ({
        url: "wishlist",
        method: "POST",
        body
      }),
      invalidatesTags: ["WISHLIST"]
    }),
    getWishlist: build.query<any, string>({
      query: (id) => ({
        url: `wishlist/client/${id}`,
        method: "GET",
      }),
      providesTags: ["WISHLIST"]
    }),
  }),
});

export const { useToggleWishlitMutation, useGetWishlistQuery } = extendedApi;
