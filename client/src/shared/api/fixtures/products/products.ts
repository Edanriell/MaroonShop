import type { AxiosPromise } from "axios";

import { apiInstance } from "./base";
import type { Product } from "./model";

export type GetFilteredProductsParams = {
	filters: {
		[key: string]: Array<string> | null;
	};
};

const BASE_URL = "/products";
const BASE_FILTER_URL = "/products/filtered";

export const getProducts = (): AxiosPromise<Product[]> => {
	return apiInstance.get(BASE_URL);
};

export const getFilteredProducts = (params: any): AxiosPromise<Product[]> => {
	return apiInstance.get(BASE_FILTER_URL, { params });
};

// TODO Create function getProductsById when time comes.
