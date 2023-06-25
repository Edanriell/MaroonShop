import { ReactNode } from "react";
import { productModel } from "entities/product";

export type CatalogProductsProps = {
	filteredData: productModel.NormalizedProducts | null;
	data: productModel.NormalizedProducts;
	currentPage: number;
	productsPerPage: 12;
	dataLoading: boolean;
};

export type CatalogProductsWrapperProps = {
	children: ReactNode;
};
