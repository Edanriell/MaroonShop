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

export const productSchema = new schema.Entity<Product>("products");

export const normalizeProduct = (data: Product) =>
	normalize<Product, { products: NormalizedProducts }>(data, productSchema);

export const normalizeProducts = (data: Product[]) =>
	normalize<Product, { products: NormalizedProducts }>(data, [productSchema]);

export const initialState: {
	data: NormalizedProducts;
	filteredData: NormalizedProducts;
	operationResultMessage: OperationResultMessage;
	isDataLoading: boolean;
} = {
	data: {},
	filteredData: {},
	operationResultMessage: { error: null, success: null },
	isDataLoading: false,
};

export const productModel = createSlice({
	name: "products",
	initialState,
	reducers: {
		setProducts: (state, { payload }: PayloadAction<Product[]>) => {
			state.data = normalizeProducts(payload).entities.products;
		},
		setFilteredData: (state, { payload }: PayloadAction<Product[] | Product | {}>) => {
			if (JSON.stringify(payload) === "{}") {
				state.filteredData = payload;
			} else if (Array.isArray(payload)) {
				state.filteredData = normalizeProducts(payload as Product[]).entities.products;
			} else {
				state.filteredData = normalizeProduct(payload as Product).entities.products;
			}
		},
		setOperationResultMessage: (
			state,
			{ payload }: PayloadAction<{ error: string | null; success: string | null }>,
		) => {
			if (payload.error) {
				state.operationResultMessage.error = payload.error;
			} else if (payload.success) {
				state.operationResultMessage.success = payload.success;
			}
		},
		clearOperationResultMessage: (state, { payload = null }: PayloadAction<null>) => {
			state.operationResultMessage = { error: null, success: null };
		},
		setDataLoading: (state, { payload }: PayloadAction<boolean>) => {
			state.isDataLoading = payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getProductsAsync.pending, (state) => {
			state.isDataLoading = true;
		});
		builder.addCase(getProductsAsync.fulfilled, (state, { payload }) => {
			if ("error" in payload && payload.error === undefined) {
				state.operationResultMessage.error = "Неудалось загрузить товары.";
				state.data = {};
			} else if ("error" in payload && payload.error) {
				state.operationResultMessage.error = payload.error;
				state.data = {};
			} else if ("products" in payload && payload.products) {
				state.operationResultMessage = { error: null, success: null };
				state.data = normalizeProducts(payload.products).entities.products;
			}
			state.isDataLoading = false;
		});
		builder.addCase(getProductsAsync.rejected, (state) => {
			state.isDataLoading = false;
		});

		builder.addCase(getFilteredProductsByCategoryAsync.pending, (state) => {
			state.isDataLoading = true;
		});
		builder.addCase(getFilteredProductsByCategoryAsync.fulfilled, (state, { payload }) => {
			if ("error" in payload && payload.error === undefined) {
				state.operationResultMessage.error = "Неудалось загрузить товары.";
				state.filteredData = {};
				state.data = {};
			} else if ("error" in payload && payload.error) {
				state.operationResultMessage.error = payload.error;
				state.filteredData = {};
				state.data = {};
			} else if ("filteredProducts" in payload && payload.filteredProducts) {
				state.operationResultMessage = { error: null, success: null };
				state.filteredData = normalizeProducts(payload.filteredProducts).entities.products;
			}
			state.isDataLoading = false;
		});
		builder.addCase(getFilteredProductsByCategoryAsync.rejected, (state) => {
			state.isDataLoading = false;
		});

		builder.addCase(getProductByIdAsync.pending, (state) => {
			state.isDataLoading = true;
		});
		builder.addCase(getProductByIdAsync.fulfilled, (state, { payload }) => {
			state.filteredData = normalizeProduct(payload).entities.products;
			state.isDataLoading = false;
		});
		builder.addCase(getProductByIdAsync.rejected, (state) => {
			state.isDataLoading = false;
		});

		builder.addCase(getBestSellingProductsAsync.pending, (state) => {
			state.isDataLoading = true;
		});
		builder.addCase(getBestSellingProductsAsync.fulfilled, (state, { payload }) => {
			if ("error" in payload && payload.error === undefined) {
				state.operationResultMessage.error = "Неудалось загрузить бестселлеры.";
				state.filteredData = {};
			} else if ("error" in payload && payload.error) {
				state.operationResultMessage.error = payload.error;
				state.filteredData = {};
			} else if ("bestSellingProducts" in payload && payload.bestSellingProducts) {
				state.operationResultMessage = { error: null, success: null };
				state.filteredData = normalizeProducts(
					payload.bestSellingProducts,
				).entities.products;
			}
			state.isDataLoading = false;
		});
		builder.addCase(getBestSellingProductsAsync.rejected, (state) => {
			state.isDataLoading = false;
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

export const getFilteredProductsByCategoryAsync = createAsyncThunk(
	"products/getFilteredProductsByCategoryAsync",
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
			const response = await productsApi.products.getFilteredProductsByCategory({
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
	async (productId: number, { rejectWithValue }) => {
		try {
			const response = await productsApi.products.getProductById(productId);
			const { data } = response;
			// console.log(data);
			return data;
		} catch (err) {
			// eslint-disable-next-line no-console
			console.error("Failed to fetch product:", err);
			return rejectWithValue((err as any).message);
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

export const useProducts = () =>
	useSelector(
		createSelector(
			(state: RootState) => state.products.data,
			(products) => products,
		),
	);

export const useFilteredProducts = () =>
	useSelector(
		createSelector(
			(state: RootState) => state.products.filteredData,
			(filteredProducts) => filteredProducts,
		),
	);

export const useIsDataLoading = () =>
	useSelector(
		createSelector(
			(state: RootState) => state.products.isDataLoading,
			(isDataLoading) => isDataLoading,
		),
	);

export const useOperationResultMessage = () =>
	useSelector(
		createSelector(
			(state: RootState) => state.products.operationResultMessage,
			(operationResultMessage) => operationResultMessage,
		),
	);

// SHIT AFTER ALL THIS, NEED TO REFACTOR
export const useProduct = (productId: number) =>
	useSelector(
		createSelector(
			(state: RootState) => state.products.filteredData,
			(products) => {
				if (products) return products[productId];
			},
		),
	);

// useBestsellers, useMostViewedProducts also useUsersMostViewedProducts must be
// returned by the server and saved into the state.filteredData
// hooks useBestsellers also useMostViewedProducts must be deleted

// export const useBestsellers = ({ maxProductsCount }: { maxProductsCount: number }) =>
// 	useSelector(
// 		createSelector(
// 			(state: RootState) => state.products.data,
// 			(products) => {
// 				return Object.values(products)
// 					.sort((a, b) => b.sells - a.sells)
// 					.slice(0, maxProductsCount);
// 			},
// 		),
// 	);

export const useMostViewedProducts = ({ maxProductsCount }: { maxProductsCount: number }) =>
	useSelector(
		createSelector(
			(state: RootState) => state.products.data,
			(products) => {
				return Object.values(products)
					.sort((a, b) => b.views - a.views)
					.slice(0, maxProductsCount);
			},
		),
	);

export const setProducts = createAction<NormalizedProducts | {}>("products/setProducts");

export const setFilteredProducts = createAction<NormalizedProducts | null>(
	"products/setFilteredData",
);

export const setOperationResultMessage = createAction<OperationResultMessage | null>(
	"products/setOperationResultMessage",
);

export const clearOperationResultMessage = createAction<OperationResultMessage | null>(
	"products/clearOperationResultMessage",
);

export const setDataLoading = createAction<boolean>("products/setDataLoading");

// All this below must be refactored or deleted.
export const isProductsEmpty = (products: NormalizedProducts): boolean => {
	return Object.keys(products).length === 0;
};

export const isFilteredProductsEmpty = (filteredProducts: any): boolean => {
	if (!filteredProducts) return true;
	return Object.keys(filteredProducts).length === 0;
};

export const isMostViewedProductsEmpty = (mostViewedProducts: NormalizedProducts): boolean => {
	if (!mostViewedProducts) return true;
	return Object.keys(mostViewedProducts).length === 0;
};

export const reducer = productModel.reducer;
