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
		mostViewedData: {
			data: NormalizedProducts;
			operationResultMessage: OperationResultMessage;
			isLoading: boolean;
		};
		userLastViewedData: {
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
		mostViewedData: {
			data: {},
			operationResultMessage: { error: null, success: null },
			isLoading: false,
		},
		userLastViewedData: {
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
		setMostViewedData: (state, { payload }: PayloadAction<Product[] | Product | {}>) => {
			if (JSON.stringify(payload) === "{}") {
				state.data.mostViewedData.data = payload;
			} else if (Array.isArray(payload)) {
				state.data.mostViewedData.data = normalizeProducts(
					payload as Product[],
				).entities.products;
			} else {
				state.data.mostViewedData.data = normalizeProduct(
					payload as Product,
				).entities.product;
			}
		},
		setUserLastViewedData: (state, { payload }: PayloadAction<Product[] | Product | {}>) => {
			if (JSON.stringify(payload) === "{}") {
				state.data.userLastViewedData.data = payload;
			} else if (Array.isArray(payload)) {
				state.data.userLastViewedData.data = normalizeProducts(
					payload as Product[],
				).entities.products;
			} else {
				state.data.userLastViewedData.data = normalizeProduct(
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
		setMostViewedDataOperationResultMessage: (
			state,
			{ payload }: PayloadAction<{ error: string | null; success: string | null }>,
		) => {
			if (payload.error) {
				state.data.mostViewedData.operationResultMessage.error = payload.error;
			} else if (payload.success) {
				state.data.mostViewedData.operationResultMessage.success = payload.success;
			}
		},
		setUserLastViewedDataOperationResultMessage: (
			state,
			{ payload }: PayloadAction<{ error: string | null; success: string | null }>,
		) => {
			if (payload.error) {
				state.data.userLastViewedData.operationResultMessage.error = payload.error;
			} else if (payload.success) {
				state.data.userLastViewedData.operationResultMessage.success = payload.success;
			}
		},
		clearFetchOperationResultMessage: (state, { payload = null }: PayloadAction<null>) => {
			state.data.fetchedData.operationResultMessage = { error: null, success: null };
		},
		clearFilterOperationResultMessage: (state, { payload = null }: PayloadAction<null>) => {
			state.data.filteredData.operationResultMessage = { error: null, success: null };
		},
		clearMostViewedDataOperationResultMessage: (
			state,
			{ payload = null }: PayloadAction<null>,
		) => {
			state.data.mostViewedData.operationResultMessage = { error: null, success: null };
		},
		clearUserLastViewedDataOperationResultMessage: (
			state,
			{ payload = null }: PayloadAction<null>,
		) => {
			state.data.userLastViewedData.operationResultMessage = { error: null, success: null };
		},
		setFetchedDataLoading: (state, { payload }: PayloadAction<boolean>) => {
			state.data.fetchedData.isLoading = payload;
		},
		setFilteredDataLoading: (state, { payload }: PayloadAction<boolean>) => {
			state.data.filteredData.isLoading = payload;
		},
		setMostViewedDataLoading: (state, { payload }: PayloadAction<boolean>) => {
			state.data.mostViewedData.isLoading = payload;
		},
		setUserLastViewedDataLoading: (state, { payload }: PayloadAction<boolean>) => {
			state.data.userLastViewedData.isLoading = payload;
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

		builder.addCase(getMostViewedProductsAsync.pending, (state) => {
			state.data.mostViewedData.isLoading = true;
		});
		builder.addCase(getMostViewedProductsAsync.fulfilled, (state, { payload }) => {
			if ("error" in payload && payload.error === undefined) {
				state.data.mostViewedData.operationResultMessage.error =
					"Не удалось загрузить самые просматриваемые товары.";
			} else if ("error" in payload && payload.error) {
				state.data.mostViewedData.operationResultMessage.error = payload.error;
			} else if ("mostViewedProducts" in payload && payload.mostViewedProducts) {
				state.data.mostViewedData.operationResultMessage = { error: null, success: null };
				state.data.mostViewedData.data = normalizeProducts(
					payload.mostViewedProducts,
				).entities.products;
			}
			state.data.mostViewedData.isLoading = false;
		});
		builder.addCase(getMostViewedProductsAsync.rejected, (state) => {
			state.data.mostViewedData.isLoading = false;
		});
		// REEEEEEEEEEEEFFFFFFFFAAAAAAAAACCCCTTTTTTTTORRRRRR
		builder.addCase(getRecentlyWatchedProductsAsync.pending, (state) => {
			state.data.userLastViewedData.isLoading = true;
		});
		builder.addCase(getRecentlyWatchedProductsAsync.fulfilled, (state, { payload }) => {
			if ("error" in payload && payload.error === undefined) {
				state.data.userLastViewedData.operationResultMessage.error =
					"Не удалось загрузить последние просмотренные товары.";
			} else if ("error" in payload && payload.error) {
				state.data.userLastViewedData.operationResultMessage.error = payload.error;
			} else if ("recentlyWatchedProducts" in payload && payload.recentlyWatchedProducts) {
				state.data.userLastViewedData.operationResultMessage = {
					error: null,
					success: null,
				};
				state.data.userLastViewedData.data = normalizeProducts(
					payload.recentlyWatchedProducts,
				).entities.products;
			}
			state.data.userLastViewedData.isLoading = false;
		});
		builder.addCase(getRecentlyWatchedProductsAsync.rejected, (state) => {
			state.data.userLastViewedData.isLoading = false;
		});

		builder.addCase(updateRecentlyWatchedProductsAsync.pending, (state) => {
			state.data.userLastViewedData.isLoading = true;
		});
		builder.addCase(updateRecentlyWatchedProductsAsync.fulfilled, (state, { payload }) => {
			if ("error" in payload && payload.error === undefined) {
				state.data.userLastViewedData.operationResultMessage.error =
					"Не удалось загрузить последние просмотренные товары.";
			} else if ("error" in payload && payload.error) {
				state.data.userLastViewedData.operationResultMessage.error = payload.error;
			} else if ("recentlyWatchedProducts" in payload && payload.recentlyWatchedProducts) {
				state.data.userLastViewedData.operationResultMessage = {
					error: null,
					success: null,
				};
				state.data.userLastViewedData.data = normalizeProducts(
					payload.recentlyWatchedProducts,
				).entities.products;
			}
			state.data.userLastViewedData.isLoading = false;
		});
		builder.addCase(updateRecentlyWatchedProductsAsync.rejected, (state) => {
			state.data.userLastViewedData.isLoading = false;
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

export const getMostViewedProductsAsync = createAsyncThunk(
	"products/getMostViewedProductsAsync",
	async ({ views, productsCount }: { views: number; productsCount: number }) => {
		try {
			const response = await productsApi.products.getMostViewedProducts({
				views,
				productsCount,
			});
			return { mostViewedProducts: response.data.mostViewedProducts };
		} catch (error) {
			const errorMessage = (error as any).response?.data?.message;
			return { error: errorMessage };
		}
	},
);

export const getRecentlyWatchedProductsAsync = createAsyncThunk(
	"products/getRecentlyWatchedProductsAsync",
	async ({ productsCount }: { productsCount: number }) => {
		try {
			const response = await productsApi.products.getRecentlyWatchedProducts({
				productsCount,
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
		productsCount,
		currentlyViewedProduct,
	}: {
		productsCount: number;
		currentlyViewedProduct: any;
	}) => {
		try {
			const response = await productsApi.products.updateRecentlyWatchedProducts({
				productsCount,
				currentlyViewedProduct,
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

export const useMostViewedProducts = () =>
	useSelector(
		createSelector(
			(state: RootState) => state.products.data.mostViewedData.data,
			(mostViewedProducts) => mostViewedProducts,
		),
	);

export const useRecentlyWatchedProducts = () =>
	useSelector(
		createSelector(
			(state: RootState) => state.products.data.userLastViewedData.data,
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

export const useIsMostViewedDataLoading = () =>
	useSelector(
		createSelector(
			(state: RootState) => state.products.data.mostViewedData.isLoading,
			(isDataLoading) => isDataLoading,
		),
	);

export const useIsUserLastViewedDataLoading = () =>
	useSelector(
		createSelector(
			(state: RootState) => state.products.data.userLastViewedData.isLoading,
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

export const useMostViewedDataOperationResultMessage = () =>
	useSelector(
		createSelector(
			(state: RootState) => state.products.data.mostViewedData.operationResultMessage,
			(operationResultMessage) => operationResultMessage,
		),
	);

export const useUserLastViewedDataOperationResultMessage = () =>
	useSelector(
		createSelector(
			(state: RootState) => state.products.data.userLastViewedData.operationResultMessage,
			(operationResultMessage) => operationResultMessage,
		),
	);

export const setFetchedData = createAction<NormalizedProducts | {}>("products/setFetchedData");

export const setFilteredData = createAction<NormalizedProducts | null>("products/setFilteredData");

export const setMostViewedData = createAction<NormalizedProducts | null>(
	"products/setMostViewedData",
);

export const setUserLastViewedData = createAction<NormalizedProducts | null>(
	"products/setUserLastViewedData",
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

export const setMostViewedDataOperationResultMessage = createAction<OperationResultMessage | null>(
	"products/setMostViewedDataOperationResultMessage",
);

export const setUserLastViewedDataOperationResultMessage =
	createAction<OperationResultMessage | null>(
		"products/setUserLastViewedDataOperationResultMessage",
	);

export const clearFetchOperationResultMessage = createAction<OperationResultMessage | null>(
	"products/clearFetchOperationResultMessage",
);

export const clearFilterOperationResultMessage = createAction<OperationResultMessage | null>(
	"products/clearFilterOperationResultMessage",
);

export const clearMostViewedDataOperationResultMessage =
	createAction<OperationResultMessage | null>(
		"products/clearMostViewedDataOperationResultMessage",
	);

export const clearUserLastViewedDataOperationResultMessage =
	createAction<OperationResultMessage | null>(
		"products/clearUserLastViewedDataOperationResultMessage",
	);

export const setFetchedDataLoading = createAction<boolean>("products/setFetchedDataLoading");

export const setFilteredDataLoading = createAction<boolean>("products/setFilteredDataLoading");

export const setMostViewedDataLoading = createAction<boolean>("products/setMostViewedDataLoading");

export const setUserLastViewedDataLoading = createAction<boolean>(
	"products/setUserLastViewedDataLoading",
);

export const reducer = productModel.reducer;
