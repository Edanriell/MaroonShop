import type { AxiosPromise } from "axios";

import { apiInstance } from "./base";
import { BestSellingProducts, Products, SingleProduct, FilteredProducts } from "./types";

export type GetFilteredProductsParams = {
	filters: {
		[key: string]: Array<string> | null;
	};
};

const BASE_URL = "api/products";
const BASE_FILTER_URL = "api/products/filtered-by-categories";
const BASE_FILTER_BY_ID_URL = "api/product/filtered-by-id";
const BASE_BEST_SELLING_PRODUCTS_URL = "api/products/best-selling";

export const getProducts = (): AxiosPromise<Products> => {
	return apiInstance.get(BASE_URL);
};

export const getFilteredProductsByCategories = ({
	mainCategory,
	secondaryCategory,
	skinTypeCategory,
}: {
	mainCategory?: String[] | null;
	secondaryCategory?: String[] | null;
	skinTypeCategory?: String[] | null;
}): AxiosPromise<FilteredProducts> => {
	return apiInstance.get(BASE_FILTER_URL, {
		params: { mainCategory, secondaryCategory, skinTypeCategory },
	});
};

export const getProductById = ({
	productId,
}: {
	productId: string;
}): AxiosPromise<SingleProduct> => {
	return apiInstance.get(BASE_FILTER_BY_ID_URL, {
		params: { productId },
	});
};

export const getBestSellingProducts = ({
	sells,
	productsCount,
}: {
	sells: number;
	productsCount: number;
}): AxiosPromise<BestSellingProducts> => {
	return apiInstance.get(BASE_BEST_SELLING_PRODUCTS_URL, {
		params: { sells, productsCount },
	});
};
