import type { AxiosPromise } from "axios";

import { apiInstance } from "./base";
import {
	BestSellingProducts,
	MostWatchedProducts,
	Products,
	SingleProduct,
	FilteredProducts,
	RecentlyWatchedProducts,
} from "./types";

import { Product } from "./model";

export type GetFilteredProductsParams = {
	filters: {
		[key: string]: Array<string> | null;
	};
};

const BASE_URL = "api/products";
const BASE_FILTER_URL = "api/products/filtered-by-categories";
const BASE_FILTER_BY_ID_URL = "api/product/filtered-by-id";
const BASE_BEST_SELLING_PRODUCTS_URL = "api/products/best-selling";
const BASE_MOST_WATCHED_PRODUCTS_URL = "api/products/most-watched";
const BASE_RECENTLY_WATCHED_PRODUCTS_URL = "api/products/recently-watched";
const BASE_UPDATE_RECENTLY_WATCHED_PRODUCTS_URL = "api/products/update-recently-watched";
const BASE_UPDATE_PRODUCT_VIEWS_URL = "api/product/update-views";
const BASE_CREATE_NEW_PRODUCT_URL = "api/product/create-new";
const BASE_DELETE_EXISTING_PRODUCT_URL = "api/product/delete-existing";
const BASE_UPDATE_EXISTING_PRODUCT_DATA_URL = "api/product/update-existing-data";

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

export const getMostWatchedProducts = ({
	views,
	productsCount,
}: {
	views: number;
	productsCount: number;
}): AxiosPromise<MostWatchedProducts> => {
	return apiInstance.get(BASE_MOST_WATCHED_PRODUCTS_URL, {
		params: { views, productsCount },
	});
};

export const getRecentlyWatchedProducts = ({
	userId,
	productsCount,
}: {
	userId: string;
	productsCount: number;
}): AxiosPromise<RecentlyWatchedProducts> => {
	return apiInstance.get(BASE_RECENTLY_WATCHED_PRODUCTS_URL, {
		params: { userId, productsCount },
	});
};

export const updateRecentlyWatchedProducts = ({
	userId,
	productsCount,
	currentlyWatchedProduct,
}: {
	userId: string;
	productsCount: number;
	currentlyWatchedProduct: any;
}): AxiosPromise<RecentlyWatchedProducts> => {
	return apiInstance.put(BASE_UPDATE_RECENTLY_WATCHED_PRODUCTS_URL, {
		userId,
		productsCount,
		currentlyWatchedProduct,
	});
};

export const updateProductViews = ({ productId }: { productId: string }): AxiosPromise<Product> => {
	return apiInstance.put(BASE_UPDATE_PRODUCT_VIEWS_URL, {
		productId,
	});
};

export const createNewProduct = ({
	productName,
	productComponents,
	productDescription,
	productUsage,
	productImageSmall,
	productImageMedium,
	productImageLarge,
	mainType,
	secondaryType,
	skinType,
	productPrice,
	productQuantity,
}: {
	productName: string;
	productComponents: string;
	productDescription: string;
	productUsage: string;
	productImageSmall: string;
	productImageMedium: string;
	productImageLarge: string;
	mainType: string;
	secondaryType: string;
	skinType: string;
	productPrice: string;
	productQuantity: string;
}): AxiosPromise<Product> => {
	return apiInstance.post(BASE_CREATE_NEW_PRODUCT_URL, {
		productName,
		productComponents,
		productDescription,
		productUsage,
		productImageSmall,
		productImageMedium,
		productImageLarge,
		mainType,
		secondaryType,
		skinType,
		productPrice,
		productQuantity,
	});
};

export const deleteExistingProduct = ({
	productName,
	productId,
}: {
	productName: string;
	productId: string;
}): AxiosPromise<Product> => {
	return apiInstance.delete(BASE_DELETE_EXISTING_PRODUCT_URL, {
		params: {
			productName,
			productId,
		},
	});
};

export const updateExistingProductData = ({
	productId,
	productName,
	productComponents,
	productDescription,
	productUsage,
	productImageSmall,
	productImageMedium,
	productImageLarge,
	mainType,
	secondaryType,
	skinType,
	productPrice,
	productQuantity,
}: {
	productId: string;
	productName: string;
	productComponents: string;
	productDescription: string;
	productUsage: string;
	productImageSmall: string;
	productImageMedium: string;
	productImageLarge: string;
	mainType: string;
	secondaryType: string;
	skinType: string;
	productPrice: string;
	productQuantity: string;
}): AxiosPromise<Product> => {
	return apiInstance.put(BASE_UPDATE_EXISTING_PRODUCT_DATA_URL, {
		productId,
		productName,
		productComponents,
		productDescription,
		productUsage,
		productImageSmall,
		productImageMedium,
		productImageLarge,
		mainType,
		secondaryType,
		skinType,
		productPrice,
		productQuantity,
	});
};
