import { createSelector, createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { useIsFetching, useQuery } from "react-query";
import { schema, normalize } from "normalizr";
import type { AxiosResponse } from "axios";

import { Product, productsApi } from "shared/api";

type NormalizedProducts = Record<number, Product>;

export type RootState = {
	products: {
		data: NormalizedProducts;
		queryConfig?: QueryConfig | undefined;
	};
};

// TODO Rethink QueryConfig type
export type QueryConfig = {
	id?: number;
	type?: {
		main: string;
		secondary: string;
		skin: Array<string>;
	};
	views?: number;
	sells?: number;
};

const PRODUCT_LIST_QUERY_KEY = "products";

export const productSchema = new schema.Entity<Product>("products");

export const normalizeProduct = (data: Product) =>
	normalize<Product, { products: NormalizedProducts }>(data, productSchema);

export const normalizeProducts = (data: Product[]) =>
	normalize<Product, { products: NormalizedProducts }>(data, [productSchema]);

export const initialState: {
	data: NormalizedProducts;
	queryConfig?: QueryConfig;
} = {
	data: {},
	queryConfig: {},
};

export const productModel = createSlice({
	name: "products",
	initialState,
	reducers: {
		setProducts: (state, { payload }: PayloadAction<Product[]>) => {
			state.data = normalizeProducts(payload).entities.products;
		},
		setQueryConfig: (state, { payload }: PayloadAction<QueryConfig>) => {
			state.queryConfig = payload;
		},
	},
});

export const getProductsAsync =
	(params?: productsApi.products.GetProductsParams) => (dispatch: Dispatch) =>
		useQuery<AxiosResponse<Product[]>>(
			PRODUCT_LIST_QUERY_KEY,
			() => productsApi.products.getProducts(params),
			{
				onSuccess: ({ data }) => dispatch(productModel.actions.setProducts(data)),
				refetchOnWindowFocus: false,
			},
		);

export const getBestsellers = () =>
	useSelector(
		createSelector(
			(state: RootState) => state.products.data,
			(products: RootState["products"]["data"]) =>
				Object.values(products).filter((product) => product.sells >= 100),
		),
	);

export const isProductsLoading = (): boolean => useIsFetching([PRODUCT_LIST_QUERY_KEY]) > 0;

export const isProductsEmpty = (): boolean =>
	useSelector(
		createSelector(
			(state: RootState) => state.products.data,
			(products) => Object.keys(products).length === 0,
		),
	);

export const reducer = productModel.reducer;
