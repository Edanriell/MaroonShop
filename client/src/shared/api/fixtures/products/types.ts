import { Product } from "./model";

export type BestSellingProducts = {
	bestSellingProducts: Product[];
};

export type Products = {
	products: Product[];
};

export type SingleProduct = {
	product: Product;
};

export type FilteredProducts = {
	filteredProducts: Product[];
};
