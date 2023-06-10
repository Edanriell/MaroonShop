import type { AxiosPromise } from "axios";

import { apiInstance } from "./base";
import type { Product } from "./model";

const BASE_URL = "/products";

export const getProducts = (): AxiosPromise<Product[]> => {
	return apiInstance.get(BASE_URL);
};

// TODO Create function getProductsById when time comes.
