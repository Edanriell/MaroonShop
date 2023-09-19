import { Product } from "shared/api";

export type NormalizedProducts = Record<number, Product>;

export type RootState = {
	products: {
		data: NormalizedProducts;
		filteredData: NormalizedProducts;
		operationResultMessage: OperationResultMessage;
		isDataLoading: boolean;
	};
};

export type OperationResultMessage = {
	error: string | null;
	success: string | null;
};
