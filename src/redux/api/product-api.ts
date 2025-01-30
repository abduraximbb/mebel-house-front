import { IGetProducts, IProduct, IProductQuery } from "@/types";
import { mainApi } from "./index";

const extendedApi = mainApi.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<IGetProducts, IProductQuery>({
      query: (params) => ({
        url: "product",
        method: "GET",
        params,
      }),
      providesTags: ["PRODUCT"],
    }),
    getProductById: build.query<IProduct, any>({
      query: (params) => ({
        url: "product/:id",
        method: "GET",
        params,
      }),
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = extendedApi;
