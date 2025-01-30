import { mainApi } from "./index";

const extendedApi = mainApi.injectEndpoints({
  endpoints: (build) => ({
    toggleWishlit: build.mutation<any, { productId: number; clientId: number }>(
      {
        query: (body) => ({
          url: "wishlist",
          method: "POST",
          body,
        }),
        invalidatesTags: ["WISHLIST"],
      }
    ),
    setWishlist: build.mutation<any, any>({
      query: (args) => ({
        url: `wishlist/wishlist/${args.clientId}`,
        method: "POST",
        body: args.wishlist,
      }),
      invalidatesTags: ["WISHLIST"],
    }),
    getWishlist: build.query<any, number>({

      query: (id: number) => ({
        url: `wishlist/client/${id}`,
        method: "GET",
      }),
      providesTags: ["WISHLIST"],
    }),
  }),
});

export const { useToggleWishlitMutation, useGetWishlistQuery, useSetWishlistMutation } = extendedApi;
