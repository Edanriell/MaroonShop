export type CatalogPaginationProps = {
	dataLoading: boolean;
	operationResultMessage: { error: string | null; success: string | null };
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
};
