import {
	createSlice,
	PayloadAction,
	createAsyncThunk,
	createSelector,
	createAction,
} from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

import { User, Product } from "shared/api";
import { UserService } from "shared/services";

import { RootState, UserData, OperationResultMessage } from "./types";

export const initialState: {
	data: User[] | User;
	cart: Product[];
	operationResultMessage: OperationResultMessage;
	isDataLoading: boolean;
} = {
	data: [],
	cart: [],
	operationResultMessage: {
		error: null,
		success: null,
	},
	isDataLoading: false,
};

export const userModel = createSlice({
	name: "user",
	initialState,
	reducers: {
		updateData: (state, { payload }: PayloadAction<User | User[]>) => {
			if (Array.isArray(payload) === true) {
				state.data = [...(payload as User[])];
			} else {
				state.data = payload;
			}
		},
		addProductToCart: (state, { payload }: PayloadAction<Product>) => {
			state.cart.push(payload);
		},
		removeProductFromCart: (state, { payload }: PayloadAction<Product>) => {
			state.cart = state.cart.filter((product) => product.id !== payload.id);
		},
		clearCart: (state) => {
			state.cart = [];
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
	},
	extraReducers: (builder) => {
		builder.addCase(updateUserData.pending, (state) => {
			state.isDataLoading = true;
		});
		builder.addCase(updateUserData.fulfilled, (state, { payload }) => {
			if ("error" in payload) {
				state.operationResultMessage.error = payload.error;
			} else if ("user" in payload) {
				if (Array.isArray(payload) === true) {
					state.data = [...(payload.user as User[])];
				} else {
					state.data = payload.user;
				}
				state.operationResultMessage.success = "Данные успешно обновлены.";
			}
			state.isDataLoading = false;
		});
		builder.addCase(updateUserData.rejected, (state) => {
			state.isDataLoading = false;
		});
	},
});

export const updateUserData = createAsyncThunk(
	"session/updateUserData",
	async (userData: UserData) => {
		try {
			const response = await UserService.updateUserData({
				id: userData.id,
				name: userData.name,
				surname: userData.surname,
				address: userData.address,
				email: userData.email,
			});
			return { user: response.data.user };
		} catch (error) {
			const errorMessage = (error as any).response?.data?.message;
			return { error: errorMessage };
		}
	},
);

export const useUpdatedData = () =>
	useSelector(
		createSelector(
			(state: RootState) => state.user.data,
			(user: User[] | User) => user,
		),
	);

export const useProductsFromCart = () =>
	useSelector(
		createSelector(
			(state: RootState) => state.user.cart,
			(product: Product[]) => product,
		),
	);

export const useOperationResultMessage = () =>
	useSelector(
		createSelector(
			(state: RootState) => state.user.operationResultMessage,
			(message: { error: string | null; success: string | null }) => message,
		),
	);

export const updatedData = createAction<string | null>("user/updateData");

export const addProductToCart = createAction<string | null>("user/addProductToCart");

export const removeProductFromCart = createAction<string | null>("user/removeProductFromCart");

export const clearCart = createAction<string | null>("user/clearCart");

export const setOperationResultMessage = createAction<OperationResultMessage | null>(
	"user/setOperationResultMessage",
);

export const clearOperationResultMessage = createAction<OperationResultMessage | null>(
	"user/clearOperationResultMessage",
);

export const reducer = userModel.reducer;
