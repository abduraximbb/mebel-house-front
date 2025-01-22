export interface IGetResponseProducts {
  data: IGetProducts;
  message: string;
  statusCode: number;
}
export interface IGetProducts {
  limit: number;
  page: number;
  products: IProduct[];
  total: number;
}
export interface IProduct {
  id: number;
  name: string;
  stock: number;
  images: string[];
  description: string;
  avg_rating: number;
  price: number;
  colors: string[];
  tags: string[];
}
export interface IProductQuery {
  filter?: string;
  order?: "asc" | "desc";
  page?: number;
  limit?: number;
  price?: "asc" | "desc";
}

// export interface IGetResponseProducts {
//   data: IGetProducts;
//   message: string;
//   statusCode: number;
// }

// export interface IGetProducts {
//   limit: number;
//   page: number;
//   data: IProduct[]; // 'products' key o'rniga 'data' ishlatilgan
//   total: number;
// }

// export interface IProduct {
//   id: number;
//   name: string;
//   stock: number;
//   images: string[];
//   description: string;
//   avg_rating: number;
//   price: number;
//   colors: string[];
//   tags: string[];
// }

// export interface IProductQuery {
//   filter?: string;
//   order?: "asc" | "desc";
//   page?: number;
//   limit?: number;
//   price?: "asc" | "desc";
// }
