import type { AxiosPromise } from "axios";

import { apiInstance } from "./base";
import type { Product } from "./model";

const BASE_URL = "/products";

// TODO change GetProductsParams type when time comes.
export type GetProductsParams = {
	id?: number;
	name?: string;
	description?: Array<String>;
	components?: string;
	usage?: string;
	type?: {
		main: string;
		secondary: string;
		skin: Array<string>;
	};
	image?: {
		lg: string;
		md: string;
		sm: string;
	};
	price?: number;
	views?: number;
	sells?: number;
};

export type GetProductByIdParams = {
	id: number;
};

export const getProducts = (params?: GetProductsParams): AxiosPromise<Product[]> => {
	return apiInstance.get(BASE_URL, { params });
};

// TODO Create corresponding routes in backend !
export const getProductById = ({ id, ...params }: GetProductByIdParams): AxiosPromise<Product> => {
	return apiInstance.get(`${BASE_URL}/${id}`, { params });
};
