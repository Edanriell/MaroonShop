import type { AxiosPromise } from "axios";

import { apiInstance } from "./base";
import type { Product } from "./model";

export type GetFilteredProductsParams = {
	filters: {
		"main-category": Array<string> | null;
		"secondary-category": Array<string> | null;
		"skin-type-category": Array<string> | null;
	};
};

const BASE_URL = "/products";
const BASE_FILTER_URL = "/products/filtered";

export const getProducts = (): AxiosPromise<Product[]> => {
	return apiInstance.get(BASE_URL);
};

export const getFilteredProducts = (params: GetFilteredProductsParams): AxiosPromise<Product[]> => {
	return apiInstance.get(BASE_FILTER_URL, { params });
};

// TODO Create function getProductsById when time comes.
