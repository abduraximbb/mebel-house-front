import { ICategory, IGetCategories } from "@/types";
import { mainApi } from "./index";

const extendedApi = mainApi.injectEndpoints({
  endpoints: (build) => ({
    getCategoryById: build.query<ICategory, any>({
      query: (id) => ({
        url: `category/${id}`,
        method: "GET",
      }),
    }),
    getCategories: build.query<IGetCategories, any>({
      query: (params) => ({
        url: "category",
        method: "GET",
        params,
      }),
    }),
  }),
});

export const { useGetCategoryByIdQuery, useGetCategoriesQuery } = extendedApi;
