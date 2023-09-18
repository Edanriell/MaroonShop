import type { AxiosPromise } from "axios";

import { apiInstance } from "./base";
import type { Product } from "./model";

export type GetFilteredProductsParams = {
	filters: {
		[key: string]: Array<string> | null;
	};
};

const BASE_URL = "api/products";
const BASE_FILTER_URL = "api/products/filtered-by-parameters";
const BASE_FILTER_BY_ID_URL = "/products/";
const BASE_BEST_SELLING_PRODUCTS_URL = "api/products/best-selling-products";

export const getProducts = (): AxiosPromise<Product[]> => {
	return apiInstance.get(BASE_URL);
};

export const getFilteredProductsByCategory = ({
	mainCategory,
	secondaryCategory,
	skinTypeCategory,
}: {
	mainCategory?: String[] | null;
	secondaryCategory?: String[] | null;
	skinTypeCategory?: String[] | null;
}): AxiosPromise<Product[]> => {
	return apiInstance.get(BASE_FILTER_URL, {
		params: { mainCategory, secondaryCategory, skinTypeCategory },
	});
};

export const getProductById = (productId: number): AxiosPromise<Product> => {
	return apiInstance.get(BASE_FILTER_BY_ID_URL + productId);
};

export const getBestSellingProducts = ({
	sells,
	productsCount,
}: {
	sells: number;
	productsCount: number;
}): AxiosPromise<Product[]> => {
	return apiInstance.get(BASE_BEST_SELLING_PRODUCTS_URL, {
		params: { sells, productsCount },
	});
};
