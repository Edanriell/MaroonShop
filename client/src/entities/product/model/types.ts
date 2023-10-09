import { Product } from "shared/api";

export type NormalizedProducts = Record<number, Product>;

export type RootState = {
	products: {
		data: {
			fetchedData: NormalizedProducts;
			filteredData: NormalizedProducts;
			mostViewedData: NormalizedProducts;
			userMostViewedData: NormalizedProducts;
		};
		operationResultMessage: OperationResultMessage;
		isDataLoading: boolean;
	};
};

export type OperationResultMessage = {
	error: string | null;
	success: string | null;
};
