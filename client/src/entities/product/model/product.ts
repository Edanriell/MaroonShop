import {
	createSlice,
	PayloadAction,
	createAsyncThunk,
	createAction,
	createSelector,
} from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { schema, normalize } from "normalizr";

import { Product, productsApi } from "shared/api";

import { NormalizedProducts, OperationResultMessage, RootState } from "./types";

export const productsSchema = new schema.Entity<Product>("products");
export const productSchema = new schema.Entity<Product>("product");

export const normalizeProduct = (data: Product) =>
	normalize<Product, { product: NormalizedProducts }>(data, productSchema);

export const normalizeProducts = (data: Product[]) =>
	normalize<Product, { products: NormalizedProducts }>(data, [productsSchema]);

export const initialState: {
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
} = {
	data: {
		fetchedData: {
			data: {},
			operationResultMessage: { error: null, success: null },
			isLoading: false,
		},
		filteredData: {
			data: {},
			operationResultMessage: { error: null, success: null },
			isLoading: false,
		},
		mostWatchedData: {
			data: {},
			operationResultMessage: { error: null, success: null },
			isLoading: false,
		},
		userRecentlyWatchedData: {
			data: {},
			operationResultMessage: { error: null, success: null },
			isLoading: false,
		},
	},
};

export const productModel = createSlice({
	name: "products",
	initialState,
	reducers: {
		setFetchedData: (state, { payload }: PayloadAction<Product[] | Product | {}>) => {
			if (JSON.stringify(payload) === "{}") {
				state.data.fetchedData.data = payload;
			} else if (Array.isArray(payload)) {
				state.data.fetchedData.data = normalizeProducts(
					payload as Product[],
				).entities.products;
			} else {
				state.data.fetchedData.data = normalizeProduct(payload as Product).entities.product;
			}
		},
		setFilteredData: (state, { payload }: PayloadAction<Product[] | Product | {}>) => {
			if (JSON.stringify(payload) === "{}") {
				state.data.filteredData.data = payload;
			} else if (Array.isArray(payload)) {
				state.data.filteredData.data = normalizeProducts(
					payload as Product[],
				).entities.products;
			} else {
				state.data.filteredData.data = normalizeProduct(
					payload as Product,
				).entities.product;
			}
		},
		setMostWatchedData: (state, { payload }: PayloadAction<Product[] | Product | {}>) => {
			if (JSON.stringify(payload) === "{}") {
				state.data.mostWatchedData.data = payload;
			} else if (Array.isArray(payload)) {
				state.data.mostWatchedData.data = normalizeProducts(
					payload as Product[],
				).entities.products;
			} else {
				state.data.mostWatchedData.data = normalizeProduct(
					payload as Product,
				).entities.product;
			}
		},
		setUserRecentlyWatchedData: (state, { payload }: PayloadAction<Product[] | Product | {}>) => {
			if (JSON.stringify(payload) === "{}") {
				state.data.userRecentlyWatchedData.data = payload;
			} else if (Array.isArray(payload)) {
				state.data.userRecentlyWatchedData.data = normalizeProducts(
					payload as Product[],
				).entities.products;
			} else {
				state.data.userRecentlyWatchedData.data = normalizeProduct(
					payload as Product,
				).entities.product;
			}
		},
		setFetchOperationResultMessage: (
			state,
			{ payload }: PayloadAction<{ error: string | null; success: string | null }>,
		) => {
			if (payload.error) {
				state.data.fetchedData.operationResultMessage.error = payload.error;
			} else if (payload.success) {
				state.data.fetchedData.operationResultMessage.success = payload.success;
			}
		},
		setFilterOperationResultMessage: (
			state,
			{ payload }: PayloadAction<{ error: string | null; success: string | null }>,
		) => {
			if (payload.error) {
				state.data.filteredData.operationResultMessage.error = payload.error;
			} else if (payload.success) {
				state.data.filteredData.operationResultMessage.success = payload.success;
			}
		},
		setMostWatchedDataOperationResultMessage: (
			state,
			{ payload }: PayloadAction<{ error: string | null; success: string | null }>,
		) => {
			if (payload.error) {
				state.data.mostWatchedData.operationResultMessage.error = payload.error;
			} else if (payload.success) {
				state.data.mostWatchedData.operationResultMessage.success = payload.success;
			}
		},
		setUserRecentlyWatchedDataOperationResultMessage: (
			state,
			{ payload }: PayloadAction<{ error: string | null; success: string | null }>,
		) => {
			if (payload.error) {
				state.data.userRecentlyWatchedData.operationResultMessage.error = payload.error;
			} else if (payload.success) {
				state.data.userRecentlyWatchedData.operationResultMessage.success = payload.success;
			}
		},
		clearFetchOperationResultMessage: (state, { payload = null }: PayloadAction<null>) => {
			state.data.fetchedData.operationResultMessage = { error: null, success: null };
		},
		clearFilterOperationResultMessage: (state, { payload = null }: PayloadAction<null>) => {
			state.data.filteredData.operationResultMessage = { error: null, success: null };
		},
		clearMostWatchedDataOperationResultMessage: (
			state,
			{ payload = null }: PayloadAction<null>,
		) => {
			state.data.mostWatchedData.operationResultMessage = { error: null, success: null };
		},
		clearUserRecentlyWatchedDataOperationResultMessage: (
			state,
			{ payload = null }: PayloadAction<null>,
		) => {
			state.data.userRecentlyWatchedData.operationResultMessage = {
				error: null,
				success: null,
			};
		},
		setFetchedDataLoading: (state, { payload }: PayloadAction<boolean>) => {
			state.data.fetchedData.isLoading = payload;
		},
		setFilteredDataLoading: (state, { payload }: PayloadAction<boolean>) => {
			state.data.filteredData.isLoading = payload;
		},
		setMostWatchedDataLoading: (state, { payload }: PayloadAction<boolean>) => {
			state.data.mostWatchedData.isLoading = payload;
		},
		setUserRecentlyWatchedDataLoading: (state, { payload }: PayloadAction<boolean>) => {
			state.data.userRecentlyWatchedData.isLoading = payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getProductsAsync.pending, (state) => {
			state.data.fetchedData.isLoading = true;
		});
		builder.addCase(getProductsAsync.fulfilled, (state, { payload }) => {
			if ("error" in payload && payload.error === undefined) {
				state.data.fetchedData.operationResultMessage.error =
					"Не удалось загрузить товары.";
			} else if ("error" in payload && payload.error) {
				state.data.fetchedData.operationResultMessage.error = payload.error;
			} else if ("products" in payload && payload.products) {
				state.data.fetchedData.operationResultMessage = { error: null, success: null };
				state.data.fetchedData.data = normalizeProducts(payload.products).entities.products;
			}
			state.data.fetchedData.isLoading = false;
		});
		builder.addCase(getProductsAsync.rejected, (state) => {
			state.data.fetchedData.isLoading = false;
		});

		builder.addCase(getFilteredProductsByCategoriesAsync.pending, (state) => {
			state.data.filteredData.isLoading = true;
		});
		builder.addCase(getFilteredProductsByCategoriesAsync.fulfilled, (state, { payload }) => {
			if ("error" in payload && payload.error === undefined) {
				state.data.filteredData.operationResultMessage.error =
					"Не удалось загрузить товары.";
			} else if ("error" in payload && payload.error) {
				state.data.filteredData.operationResultMessage.error = payload.error;
			} else if ("filteredProducts" in payload && payload.filteredProducts) {
				state.data.filteredData.operationResultMessage = { error: null, success: null };
				state.data.filteredData.data = normalizeProducts(
					payload.filteredProducts,
				).entities.products;
			}
			state.data.filteredData.isLoading = false;
		});
		builder.addCase(getFilteredProductsByCategoriesAsync.rejected, (state) => {
			state.data.filteredData.isLoading = false;
		});

		builder.addCase(getProductByIdAsync.pending, (state) => {
			state.data.filteredData.isLoading = true;
		});
		builder.addCase(getProductByIdAsync.fulfilled, (state, { payload }) => {
			if ("error" in payload && payload.error === undefined) {
				state.data.filteredData.operationResultMessage.error =
					"Не удалось загрузить товар.";
			} else if ("error" in payload && payload.error) {
				state.data.filteredData.operationResultMessage.error = payload.error;
			} else if ("product" in payload && payload.product) {
				state.data.filteredData.operationResultMessage = { error: null, success: null };
				state.data.filteredData.data = normalizeProduct(payload.product).entities.product;
			}
			state.data.filteredData.isLoading = false;
		});
		builder.addCase(getProductByIdAsync.rejected, (state) => {
			state.data.filteredData.isLoading = false;
		});

		builder.addCase(getBestSellingProductsAsync.pending, (state) => {
			state.data.filteredData.isLoading = true;
		});
		builder.addCase(getBestSellingProductsAsync.fulfilled, (state, { payload }) => {
			if ("error" in payload && payload.error === undefined) {
				state.data.filteredData.operationResultMessage.error =
					"Не удалось загрузить бестселлеры.";
			} else if ("error" in payload && payload.error) {
				state.data.filteredData.operationResultMessage.error = payload.error;
			} else if ("bestSellingProducts" in payload && payload.bestSellingProducts) {
				state.data.filteredData.operationResultMessage = { error: null, success: null };
				state.data.filteredData.data = normalizeProducts(
					payload.bestSellingProducts,
				).entities.products;
			}
			state.data.filteredData.isLoading = false;
		});
		builder.addCase(getBestSellingProductsAsync.rejected, (state) => {
			state.data.filteredData.isLoading = false;
		});

		builder.addCase(getMostWatchedProductsAsync.pending, (state) => {
			state.data.mostWatchedData.isLoading = true;
		});
		builder.addCase(getMostWatchedProductsAsync.fulfilled, (state, { payload }) => {
			if ("error" in payload && payload.error === undefined) {
				state.data.mostWatchedData.operationResultMessage.error =
					"Не удалось загрузить самые просматриваемые товары.";
			} else if ("error" in payload && payload.error) {
				state.data.mostWatchedData.operationResultMessage.error = payload.error;
			} else if ("mostWatchedProducts" in payload && payload.mostWatchedProducts) {
				state.data.mostWatchedData.operationResultMessage = { error: null, success: null };
				state.data.mostWatchedData.data = normalizeProducts(
					payload.mostWatchedProducts,
				).entities.products;
			}
			state.data.mostWatchedData.isLoading = false;
		});
		builder.addCase(getMostWatchedProductsAsync.rejected, (state) => {
			state.data.mostWatchedData.isLoading = false;
		});

		builder.addCase(getRecentlyWatchedProductsAsync.pending, (state) => {
			state.data.userRecentlyWatchedData.isLoading = true;
		});
		builder.addCase(getRecentlyWatchedProductsAsync.fulfilled, (state, { payload }) => {
			if ("error" in payload && payload.error === undefined) {
				state.data.userRecentlyWatchedData.operationResultMessage.error =
					"Не удалось загрузить последние просмотренные товары.";
			} else if ("error" in payload && payload.error) {
				state.data.userRecentlyWatchedData.operationResultMessage.error = payload.error;
			} else if ("recentlyWatchedProducts" in payload && payload.recentlyWatchedProducts) {
				state.data.userRecentlyWatchedData.operationResultMessage = {
					error: null,
					success: null,
				};
				state.data.userRecentlyWatchedData.data = normalizeProducts(
					payload.recentlyWatchedProducts,
				).entities.products;
			}
			state.data.userRecentlyWatchedData.isLoading = false;
		});
		builder.addCase(getRecentlyWatchedProductsAsync.rejected, (state) => {
			state.data.userRecentlyWatchedData.isLoading = false;
		});

		builder.addCase(updateRecentlyWatchedProductsAsync.pending, (state) => {
			state.data.userRecentlyWatchedData.isLoading = true;
		});
		builder.addCase(updateRecentlyWatchedProductsAsync.fulfilled, (state, { payload }) => {
			if ("error" in payload && payload.error === undefined) {
				state.data.userRecentlyWatchedData.operationResultMessage.error =
					"Не удалось загрузить последние просмотренные товары.";
			} else if ("error" in payload && payload.error) {
				state.data.userRecentlyWatchedData.operationResultMessage.error = payload.error;
			} else if ("recentlyWatchedProducts" in payload && payload.recentlyWatchedProducts) {
				state.data.userRecentlyWatchedData.operationResultMessage = {
					error: null,
					success: null,
				};
				state.data.userRecentlyWatchedData.data = normalizeProducts(
					payload.recentlyWatchedProducts,
				).entities.products;
			}
			state.data.userRecentlyWatchedData.isLoading = false;
		});
		builder.addCase(updateRecentlyWatchedProductsAsync.rejected, (state) => {
			state.data.userRecentlyWatchedData.isLoading = false;
		});
	},
});

export const getProductsAsync = createAsyncThunk("products/getProductsAsync", async () => {
	try {
		const response = await productsApi.products.getProducts();
		return { products: response.data.products };
	} catch (error) {
		const errorMessage = (error as any).response?.data?.message;
		return { error: errorMessage };
	}
});

export const getFilteredProductsByCategoriesAsync = createAsyncThunk(
	"products/getFilteredProductsByCategoriesAsync",
	async ({
		mainCategory,
		secondaryCategory,
		skinTypeCategory,
	}: {
		mainCategory?: String[] | null;
		secondaryCategory?: String[] | null;
		skinTypeCategory?: String[] | null;
	}) => {
		try {
			const response = await productsApi.products.getFilteredProductsByCategories({
				mainCategory,
				secondaryCategory,
				skinTypeCategory,
			});
			return { filteredProducts: response.data.filteredProducts };
		} catch (error) {
			const errorMessage = (error as any).response?.data?.message;
			return { error: errorMessage };
		}
	},
);

export const getProductByIdAsync = createAsyncThunk(
	"products/getProductByIdAsync",
	async (productId: string) => {
		try {
			const response = await productsApi.products.getProductById({ productId });
			return { product: response.data.product };
		} catch (error) {
			const errorMessage = (error as any).response?.data?.message;
			return { error: errorMessage };
		}
	},
);

export const getBestSellingProductsAsync = createAsyncThunk(
	"products/getBestSellingProductsAsync",
	async ({ sells, productsCount }: { sells: number; productsCount: number }) => {
		try {
			const response = await productsApi.products.getBestSellingProducts({
				sells,
				productsCount,
			});
			return { bestSellingProducts: response.data.bestSellingProducts };
		} catch (error) {
			const errorMessage = (error as any).response?.data?.message;
			return { error: errorMessage };
		}
	},
);

export const getMostWatchedProductsAsync = createAsyncThunk(
	"products/getMostWatchedProductsAsync",
	async ({ views, productsCount }: { views: number; productsCount: number }) => {
		try {
			const response = await productsApi.products.getMostWatchedProducts({
				views,
				productsCount,
			});
			return { mostWatchedProducts: response.data.mostWatchedProducts };
		} catch (error) {
			const errorMessage = (error as any).response?.data?.message;
			return { error: errorMessage };
		}
	},
);

export const getRecentlyWatchedProductsAsync = createAsyncThunk(
	"products/getRecentlyWatchedProductsAsync",
	async ({ productsCount, userId }: { productsCount: number; userId: string }) => {
		try {
			const response = await productsApi.products.getRecentlyWatchedProducts({
				productsCount,
				userId,
			});
			return { recentlyWatchedProducts: response.data.recentlyWatchedProducts };
		} catch (error) {
			const errorMessage = (error as any).response?.data?.message;
			return { error: errorMessage };
		}
	},
);

export const updateRecentlyWatchedProductsAsync = createAsyncThunk(
	"products/updateRecentlyWatchedProductsAsync",
	async ({
		userId,
		productsCount,
		currentlyWatchedProduct,
	}: {
		userId: string;
		productsCount: number;
		currentlyWatchedProduct: any;
	}) => {
		try {
			const response = await productsApi.products.updateRecentlyWatchedProducts({
				userId,
				productsCount,
				currentlyWatchedProduct,
			});
			return { recentlyWatchedProducts: response.data.recentlyWatchedProducts };
		} catch (error) {
			const errorMessage = (error as any).response?.data?.message;
			return { error: errorMessage };
		}
	},
);

export const useProducts = () =>
	useSelector(
		createSelector(
			(state: RootState) => state.products.data.fetchedData.data,
			(products) => products,
		),
	);

export const useProduct = () =>
	useSelector(
		createSelector(
			(state: RootState) => state.products.data.filteredData.data,
			(product) => product,
		),
	);

export const useFilteredProducts = () =>
	useSelector(
		createSelector(
			(state: RootState) => state.products.data.filteredData.data,
			(filteredProducts) => filteredProducts,
		),
	);

export const useMostWatchedProducts = () =>
	useSelector(
		createSelector(
			(state: RootState) => state.products.data.mostWatchedData.data,
			(mostWatchedProducts) => mostWatchedProducts,
		),
	);

export const useRecentlyWatchedProducts = () =>
	useSelector(
		createSelector(
			(state: RootState) => state.products.data.userRecentlyWatchedData.data,
			(recentlyWatchedProducts) => recentlyWatchedProducts,
		),
	);

export const useIsFetchedDataLoading = () =>
	useSelector(
		createSelector(
			(state: RootState) => state.products.data.fetchedData.isLoading,
			(isDataLoading) => isDataLoading,
		),
	);

export const useIsFilteredDataLoading = () =>
	useSelector(
		createSelector(
			(state: RootState) => state.products.data.filteredData.isLoading,
			(isDataLoading) => isDataLoading,
		),
	);

export const useIsMostWatchedDataLoading = () =>
	useSelector(
		createSelector(
			(state: RootState) => state.products.data.mostWatchedData.isLoading,
			(isDataLoading) => isDataLoading,
		),
	);

export const useIsUserRecentlyWatchedDataLoading = () =>
	useSelector(
		createSelector(
			(state: RootState) => state.products.data.userRecentlyWatchedData.isLoading,
			(isDataLoading) => isDataLoading,
		),
	);

export const useFetchedDataOperationResultMessage = () =>
	useSelector(
		createSelector(
			(state: RootState) => state.products.data.fetchedData.operationResultMessage,
			(operationResultMessage) => operationResultMessage,
		),
	);

export const useFilteredDataOperationResultMessage = () =>
	useSelector(
		createSelector(
			(state: RootState) => state.products.data.filteredData.operationResultMessage,
			(operationResultMessage) => operationResultMessage,
		),
	);

export const useMostWatchedDataOperationResultMessage = () =>
	useSelector(
		createSelector(
			(state: RootState) => state.products.data.mostWatchedData.operationResultMessage,
			(operationResultMessage) => operationResultMessage,
		),
	);

export const useUserRecentlyWatchedDataOperationResultMessage = () =>
	useSelector(
		createSelector(
			(state: RootState) => state.products.data.userRecentlyWatchedData.operationResultMessage,
			(operationResultMessage) => operationResultMessage,
		),
	);

export const setFetchedData = createAction<NormalizedProducts | {}>("products/setFetchedData");

export const setFilteredData = createAction<NormalizedProducts | null>("products/setFilteredData");

export const setMostWatchedData = createAction<NormalizedProducts | null>(
	"products/setMostWatchedData",
);

export const setUserRecentlyWatchedData = createAction<NormalizedProducts | null>(
	"products/setUserRecentlyWatchedData",
);

export const setFetchOperationResultMessage = createAction<OperationResultMessage | null>(
	"products/setFetchOperationResultMessage",
);

export const clearOperationResultMessage = createAction<OperationResultMessage | null>(
	"products/clearOperationResultMessage",
);

export const setFilterOperationResultMessage = createAction<OperationResultMessage | null>(
	"products/setFilterOperationResultMessage",
);

export const setMostWatchedDataOperationResultMessage = createAction<OperationResultMessage | null>(
	"products/setMostWatchedDataOperationResultMessage",
);

export const setUserRecentlyWatchedDataOperationResultMessage =
	createAction<OperationResultMessage | null>(
		"products/setUserRecentlyWatchedDataOperationResultMessage",
	);

export const clearFetchOperationResultMessage = createAction<OperationResultMessage | null>(
	"products/clearFetchOperationResultMessage",
);

export const clearFilterOperationResultMessage = createAction<OperationResultMessage | null>(
	"products/clearFilterOperationResultMessage",
);

export const clearMostWatchedDataOperationResultMessage =
	createAction<OperationResultMessage | null>(
		"products/clearMostWatchedDataOperationResultMessage",
	);

export const clearUserRecentlyWatchedDataOperationResultMessage =
	createAction<OperationResultMessage | null>(
		"products/clearUserRecentlyWatchedDataOperationResultMessage",
	);

export const setFetchedDataLoading = createAction<boolean>("products/setFetchedDataLoading");

export const setFilteredDataLoading = createAction<boolean>("products/setFilteredDataLoading");

export const setMostWatchedDataLoading = createAction<boolean>(
	"products/setMostWatchedDataLoading",
);

export const setUserRecentlyWatchedDataLoading = createAction<boolean>(
	"products/setUserRecentlyWatchedDataLoading",
);

export const reducer = productModel.reducer;
