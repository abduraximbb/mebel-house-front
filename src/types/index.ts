export interface IGetResponseProducts {
  data: IGetProducts;
  message: string;
  statusCode: number;
}
export interface IGetProducts {
  data: IProduct[];
  limit: number;
  page: number;
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
  discount: number;
  categoryId?: number;
  isLike?: boolean;
}
export interface IProductQuery {
  filter?: string;
  order?: "asc" | "desc";
  page?: number;
  limit?: number;
  price?: "asc" | "desc";
}

export interface ICustomer {
  full_name: string;
  phone_number: string;
  email: string;
  password?: string;
  confirm_password?: string;
}

export interface ISignInCustomer {
  email: string;
  password: string;
}

export interface IGetCategories {
  data: ICategory[];
}

export interface ICategory {
  id: number;
  name: string;
  description: string;
}
