export type CatalogPaginationProps = {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
};
