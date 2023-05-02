import { createSelector, createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { useIsFetching, useQuery } from "react-query";
import { schema, normalize } from "normalizr";
import type { AxiosResponse } from "axios";

import { Product, productApi } from "shared/api";

// TODO Think about QueryConfig
export type QueryConfig = {
	id?: number;
	name?: string;
	description?: Array<String>;
	components?: string;
	usage?: string;
	type?: {
		main?: string;
		secondary?: Array<string>;
		skin?: Array<string>;
	};
	image?: {
		lg: string;
		md: string;
		sm: string;
	};
	price?: number;
};

type NormalizedProducts = Record<number, Product>;

export const productSchema = new schema.Entity<Product>("products");

export const normalizeProduct = (data: Product) =>
	normalize<Product, { products: NormalizedProducts }>(data, productSchema);
console.log(normalizeProduct);
export const normalizeProducts = (data: Product[]) => {
	console.log(data);
	console.log(productSchema);
	return normalize<Product, { products: NormalizedProducts }>(data, [productSchema]);
}
	
console.log(normalizeProducts);
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
		setTasksList: (state, { payload }: PayloadAction<Product[]>) => {
			state.data = normalizeProducts(payload).entities.products;
		},
		setQueryConfig: (state, { payload }: PayloadAction<QueryConfig>) => {
			state.queryConfig = payload;
		},
	},
});

const PRODUCT_LIST_QUERY_KEY = "products";

export const getProductsListAsync =
	(params?: productApi.products.GetProductsListParams) => (dispatch: Dispatch) =>
		useQuery<AxiosResponse<Product[]>>(
			PRODUCT_LIST_QUERY_KEY,
			() => productApi.products.getProductsList(params),
			{
				onSuccess: ({ data }) => dispatch(productModel.actions.setTasksList(data)),
				refetchOnWindowFocus: false,
			},
		);

export const isProductListLoading = (): boolean => useIsFetching([PRODUCT_LIST_QUERY_KEY]) > 0;

export const isProductsEmpty = (): boolean =>
	useSelector(
		createSelector(
			(state: any) => state.products.data,
			(products) => Object.keys(products).length === 0,
		),
	);

export const reducer = productModel.reducer;
