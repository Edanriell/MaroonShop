import {
	createSlice,
	PayloadAction,
	createAsyncThunk,
	createSelector,
	createAction,
} from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

import { User } from "shared/api";

import { RegistrationCredentials, RootState } from "./types";

export const initialState: {
	data: User | User[] | null;
	cart: Product | Products[] | null;
	operationResultMessage: string | null;
} = {
	data: null,
	cart: null,
	operationResultMessage: null,
};

export const userModel = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, { payload }: PayloadAction<User>) => {
			state.user = payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(login.pending, (state) => {
			state.isDataLoading = true;
		});
		builder.addCase(login.fulfilled, (state, { payload }) => {
			if ("error" in payload) {
				state.errorMessage = payload.error;
			} else if ("user" in payload) {
				state.user = payload.user as User;
				state.isAuthorized = true;
			}
			state.isDataLoading = false;
		});
		builder.addCase(login.rejected, (state, { payload }) => {
			state.isDataLoading = false;
		});
	},
});

export const registration = createAsyncThunk(
	"session/registration",
	async (credentials: RegistrationCredentials) => {
		try {
			const response = await AuthService.registration({
				name: credentials.name,
				surname: credentials.surname,
				address: credentials.address,
				email: credentials.email,
				password: credentials.password,
			});
			localStorage.setItem("token", response.data.accessToken);
			return { user: response.data.user };
		} catch (error) {
			const errorMessage = (error as any).response?.data?.message;
			return { error: errorMessage };
		}
	},
);

export const useUser = () =>
	useSelector(
		createSelector(
			(state: RootState) => state.session.user,
			(user: User | {}) => user,
		),
	);

export const setUser = createAction<string | null>("session/setUser");

export const reducer = userModel.reducer;
