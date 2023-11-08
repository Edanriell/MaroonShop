import { Product } from "shared/api";

export type NormalizedProducts = Record<number, Product>;

export type RootState = {
	products: {
		data: {
			fetchedData: {
				data: NormalizedProducts;
				operationResultMessage: OperationResultMessage;
				isLoading: boolean;
			};
			filteredData: {
				data: NormalizedProducts;
				operationResultMessage: OperationResultMessage;
				isLoading: boolean;
			};
			mostWatchedData: {
				data: NormalizedProducts;
				operationResultMessage: OperationResultMessage;
				isLoading: boolean;
			};
			userRecentlyWatchedData: {
				data: NormalizedProducts;
				operationResultMessage: OperationResultMessage;
				isLoading: boolean;
			};
		};
	};
};

export type OperationResultMessage = {
	error: string | null;
	success: string | null;
};
