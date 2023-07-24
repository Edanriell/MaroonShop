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

import { NormalizedProducts, ProductsNotFound, ProductNotFound, RootState } from "./types";

export const productSchema = new schema.Entity<Product>("products");

export const normalizeProduct = (data: Product) =>
	normalize<Product, { products: NormalizedProducts }>(data, productSchema);

export const normalizeProducts = (data: Product[]) =>
	normalize<Product, { products: NormalizedProducts }>(data, [productSchema]);

export const initialState: {
	data: NormalizedProducts;
	filteredData: NormalizedProducts | ProductsNotFound | null;
	filteredDataById: NormalizedProducts | ProductNotFound | null;
	dataLoading: boolean;
} = {
	data: {},
	filteredData: null,
	filteredDataById: null,
	dataLoading: false,
};

export const productModel = createSlice({
	name: "products",
	initialState,
	reducers: {
		setProducts: (state, { payload }: PayloadAction<Product[]>) => {
			state.data = normalizeProducts(payload).entities.products;
		},
		setFilteredData: (state, { payload }: PayloadAction<Product[]>) => {
			if (payload === null) {
				state.filteredData = payload;
			} else {
				state.filteredData = normalizeProducts(payload).entities.products;
			}
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getProductsAsync.pending, (state) => {
			state.dataLoading = true;
		});
		builder.addCase(getProductsAsync.fulfilled, (state, { payload }) => {
			state.data = normalizeProducts(payload).entities.products;
			state.dataLoading = false;
		});
		builder.addCase(getProductsAsync.rejected, (state) => {
			state.dataLoading = false;
		});
		builder.addCase(getFilteredProductsAsync.pending, (state) => {
			state.dataLoading = true;
		});
		builder.addCase(getFilteredProductsAsync.fulfilled, (state, { payload }) => {
			if (payload.length <= 0) {
				state.filteredData = { error: "Товары не найдены" };
			} else {
				state.filteredData = normalizeProducts(payload).entities.products;
			}

			state.dataLoading = false;
		});
		builder.addCase(getFilteredProductsAsync.rejected, (state) => {
			state.dataLoading = false;
		});
		builder.addCase(getProductByIdAsync.pending, (state) => {
			state.dataLoading = true;
		});
		builder.addCase(getProductByIdAsync.fulfilled, (state, { payload }) => {
			state.filteredDataById = normalizeProduct(payload).entities.products;
			state.dataLoading = false;
		});
		builder.addCase(getProductByIdAsync.rejected, (state) => {
			state.dataLoading = false;
		});
	},
});

export const getProductsAsync = createAsyncThunk(
	"products/fetchProducts",
	async (_, { rejectWithValue }) => {
		try {
			const response = await productsApi.products.getProducts();
			const { data } = response;
			return data;
		} catch (err) {
			// eslint-disable-next-line no-console
			console.error("Failed to fetch products:", err);
			return rejectWithValue((err as any).message);
		}
	},
);

export const getFilteredProductsAsync = createAsyncThunk(
	"products/fetchFilteredProducts",
	async (parameters: any, { rejectWithValue }) => {
		try {
			const response = await productsApi.products.getFilteredProducts(parameters);
			const { data } = response;
			console.log(data);
			return data;
		} catch (err) {
			// eslint-disable-next-line no-console
			console.error("Failed to fetch products:", err);
			return rejectWithValue((err as any).message);
		}
	},
);

export const getProductByIdAsync = createAsyncThunk(
	"products/fetchProductById",
	async (productId: number, { rejectWithValue }) => {
		try {
			const response = await productsApi.products.getProductById(productId);
			const { data } = response;
			console.log(data);
			return data;
		} catch (err) {
			// eslint-disable-next-line no-console
			console.error("Failed to fetch product:", err);
			return rejectWithValue((err as any).message);
		}
	},
);

export const setProducts = createAction<NormalizedProducts | {}>("products/setProducts");

export const setFilteredProducts = createAction<NormalizedProducts | ProductsNotFound | null>(
	"products/setFilteredData",
);

export const useProducts = () =>
	useSelector(
		createSelector(
			(state: RootState) => state.products.data,
			(products) => {
				return products;
			},
		),
	);

export const useProduct = (productId: number) =>
	useSelector(
		createSelector(
			(state: RootState) => state.products.filteredDataById,
			(products) => {
				if (products) return products[productId];
			},
		),
	);

export const useFilteredProducts = () =>
	useSelector(
		createSelector(
			(state: RootState) => state.products.filteredData,
			(products) => {
				return products;
			},
		),
	);

export const useBestsellers = ({ maxProductsCount }: { maxProductsCount: number }) =>
	useSelector(
		createSelector(
			(state: RootState) => state.products.data,
			(products) => {
				return Object.values(products)
					.sort((a, b) => b.sells - a.sells)
					.slice(0, maxProductsCount);
			},
		),
	);

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
