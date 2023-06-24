import { Product } from "shared/api";

export type NormalizedProducts = Record<number, Product>;

export type RootState = {
	products: {
		data: NormalizedProducts;
		filteredData: NormalizedProducts | null;
		dataLoading: boolean;
	};
};

export type ProductsNotFound = {
	error: string;
};
