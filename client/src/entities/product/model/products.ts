import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { schema, normalize } from "normalizr";

import { Product, productsApi } from "shared/api";

import { NormalizedProducts } from "./types";

export const productSchema = new schema.Entity<Product>("products");

export const normalizeProduct = (data: Product) =>
	normalize<Product, { products: NormalizedProducts }>(data, productSchema);

export const normalizeProducts = (data: Product[]) =>
	normalize<Product, { products: NormalizedProducts }>(data, [productSchema]);

export const initialState: {
	data: NormalizedProducts;
	dataLoading: boolean;
} = {
	data: {},
	dataLoading: false,
};

export const productModel = createSlice({
	name: "products",
	initialState,
	reducers: {
		setProducts: (state, { payload }: PayloadAction<Product[]>) => {
			state.data = normalizeProducts(payload).entities.products;
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

export const isProductsEmpty = (products: NormalizedProducts): boolean => {
	return Object.keys(products).length === 0;
};

export const getBestsellers = (products: NormalizedProducts): Product[] => {
	return Object.values(products).filter((product) => product.sells >= 100);
};

export const reducer = productModel.reducer;
