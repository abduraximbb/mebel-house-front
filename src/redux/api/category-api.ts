import { ICategory } from "@/types";
import { mainApi } from "./index";

const extendedApi = mainApi.injectEndpoints({
  endpoints: (build) => ({
    getCategoryById: build.query<ICategory, any>({
      query: (id) => ({
        url: `category/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetCategoryByIdQuery } = extendedApi;
