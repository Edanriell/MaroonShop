import type { AxiosPromise } from "axios";
import { apiInstance } from "./base";
import type { Product } from "./model";

const BASE_URL = "/bestsellers";

export const getProductsList = (params?: GetProductsListParams): AxiosPromise<Product[]> => {
	return apiInstance.get(BASE_URL, { params });
};

console.log(getProductsList);

export type GetProductsListParams = {
	id?: number;
	name?: string;
	description?: Array<String>;
	components?: string;
	usage?: string;
	type?: {
		main?: string;
		secondary?: Array<string>;
		skin?: Array<string>;
	};
	image?: {
		lg: string;
		md: string;
		sm: string;
	};
	price?: number;
};
