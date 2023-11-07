import type { AxiosPromise } from "axios";

import { apiInstance } from "./base";
import {
	BestSellingProducts,
	MostViewedProducts,
	Products,
	SingleProduct,
	FilteredProducts,
	RecentlyWatchedProducts,
} from "./types";

export type GetFilteredProductsParams = {
	filters: {
		[key: string]: Array<string> | null;
	};
};

const BASE_URL = "api/products";
const BASE_FILTER_URL = "api/products/filtered-by-categories";
const BASE_FILTER_BY_ID_URL = "api/product/filtered-by-id";
const BASE_BEST_SELLING_PRODUCTS_URL = "api/products/best-selling";
const BASE_MOST_VIEWED_PRODUCTS_URL = "api/products/most-viewed";
const BASE_RECENTLY_WATCHED_PRODUCTS_URL = "api/products/recently-watched";
const BASE_UPDATE_RECENTLY_WATCHED_PRODUCTS_URL = "api/products/update-recently-watched";

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

export const getMostViewedProducts = ({
	views,
	productsCount,
}: {
	views: number;
	productsCount: number;
}): AxiosPromise<MostViewedProducts> => {
	return apiInstance.get(BASE_MOST_VIEWED_PRODUCTS_URL, {
		params: { views, productsCount },
	});
};

export const getRecentlyWatchedProducts = ({
	productsCount,
}: {
	productsCount: number;
}): AxiosPromise<RecentlyWatchedProducts> => {
	return apiInstance.get(BASE_RECENTLY_WATCHED_PRODUCTS_URL, {
		params: { productsCount },
	});
};

export const updateRecentlyWatchedProducts = ({
	userId,
	productsCount,
	currentlyViewedProduct,
}: {
	userId: string;
	productsCount: number;
	currentlyViewedProduct: any;
}): AxiosPromise<RecentlyWatchedProducts> => {
	return apiInstance.put(BASE_UPDATE_RECENTLY_WATCHED_PRODUCTS_URL, {
		userId,
		productsCount,
		currentlyViewedProduct,
	});
};
