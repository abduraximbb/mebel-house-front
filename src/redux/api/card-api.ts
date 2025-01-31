import { mainApi } from "./index";

const extendedApi = mainApi.injectEndpoints({
  endpoints: (build) => ({
    toggleCart: build.mutation<any, { productId: number; clientId: number }>({
      query: (body) => ({
        url: "cart",
        method: "POST",
        body,
      }),
      invalidatesTags: ["CART"],
    }),
    setCart: build.mutation<any, any>({
      query: (args) => ({
        url: `cart/cart/${args.clientId}`,
        method: "POST",
        body: args.cart,
      }),
      invalidatesTags: ["CART"],
    }),
    getCart: build.query<any, number>({
      query: (id: number) => ({
        url: `cart/client/${id}`,
        method: "GET",
      }),
      providesTags: ["CART"],
    }),
  }),
});

export const { useToggleCartMutation, useGetCartQuery, useSetCartMutation } =
  extendedApi;
