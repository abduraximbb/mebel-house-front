import { IGetProducts, IProductQuery } from '@/types'
import { mainApi } from './index'

const extendedApi = mainApi.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<IGetProducts, IProductQuery>({
      query: (params) => ({
        url:'product',
        method: "GET",
        params
      }),
    }),
  }),
})

export const { useGetProductsQuery } = extendedApi;