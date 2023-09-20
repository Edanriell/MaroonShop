export type CatalogErrorProps = {
	dataLoading: boolean;
	operationResultMessage: { error: string | null; success: string | null };
	onReloadButtonClick: () => void;
};
