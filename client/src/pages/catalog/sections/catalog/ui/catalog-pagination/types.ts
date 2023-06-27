import { productModel } from "entities/product";

export type CatalogPaginationProps = {
	dataLoading: boolean;
	isProductsEmpty: boolean;
	filteredProducts: productModel.NormalizedProducts | null;
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
};
