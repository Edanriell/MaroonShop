import { ReactNode } from "react";
import { productModel } from "entities/product";

export type CatalogProductsProps = {
	filteredProducts: productModel.NormalizedProducts | null;
	products: productModel.NormalizedProducts;
	currentPage: number;
	productsPerPage: 12;
	dataLoading: boolean;
};

export type CatalogProductsWrapperProps = {
	children: ReactNode;
};
