import { productsApi } from "shared/api";

export type FilterProps = {
	className: string;
};

export type Filters = productsApi.products.GetFilteredProductsParams;
