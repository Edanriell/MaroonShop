import {
	createSlice,
	PayloadAction,
	createAsyncThunk,
	createSelector,
	createAction,
} from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

import { AuthService } from "shared/services";
import { User } from "shared/api";

import { Credentials, RegistrationCredentials, RootState } from "./types";

export const initialState: {
	user: User | {};
	isAuthorized: boolean;
	isDataLoading: boolean;
	errorMessage: string | null;
} = {
	user: {},
	isAuthorized: false,
	isDataLoading: false,
	errorMessage: null,
};

export const sessionModel = createSlice({
	name: "session",
	initialState,
	reducers: {
		setUser: (state, { payload }: PayloadAction<User>) => {
			state.user = payload;
		},
		setIsAuthorized: (state, { payload }: PayloadAction<boolean>) => {
			state.isAuthorized = payload;
		},
		setDataLoading: (state, { payload }: PayloadAction<boolean>) => {
			state.isDataLoading = payload;
		},
		setErrorMessage: (state, { payload }: PayloadAction<string | null>) => {
			state.errorMessage = payload;
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

		builder.addCase(registration.pending, (state) => {
			state.isDataLoading = true;
		});
		builder.addCase(registration.fulfilled, (state, { payload }) => {
			if ("error" in payload) {
				state.errorMessage = payload.error;
			} else if ("user" in payload) {
				state.user = payload.user as User;
				state.isAuthorized = true;
			}
			state.isDataLoading = false;
		});
		builder.addCase(registration.rejected, (state) => {
			state.isDataLoading = false;
		});

		builder.addCase(logout.pending, (state) => {
			state.isDataLoading = true;
		});
		builder.addCase(logout.fulfilled, (state, { payload }) => {
			if ("user" in payload) {
				state.user = payload.user as User;
				state.isAuthorized = false;
			}
			state.isDataLoading = false;
		});
		builder.addCase(logout.rejected, (state) => {
			state.isDataLoading = false;
		});

		builder.addCase(checkAuth.pending, (state) => {
			state.isDataLoading = true;
		});
		builder.addCase(checkAuth.fulfilled, (state, { payload }) => {
			if ("error" in payload) {
				state.isAuthorized = false;
			} else if ("user" in payload) {
				state.user = payload.user as User;
				state.isAuthorized = true;
			}
			state.isDataLoading = false;
		});
		builder.addCase(checkAuth.rejected, (state) => {
			state.isDataLoading = false;
		});
	},
});

export const login = createAsyncThunk("session/login", async (credentials: Credentials) => {
	try {
		const response = await AuthService.login({
			email: credentials.email,
			password: credentials.password,
		});
		localStorage.setItem("token", response.data.accessToken);
		return { user: response.data.user };
	} catch (error) {
		const errorMessage = (error as any).response?.data?.message;
		return { error: errorMessage };
	}
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

export const logout = createAsyncThunk("session/logout", async () => {
	try {
		await AuthService.logout();
		localStorage.removeItem("token");
		return { user: {} };
	} catch (error) {
		const errorMessage = (error as any).response?.data?.message;
		return { error: errorMessage };
	}
});

export const checkAuth = createAsyncThunk("session/checkAuth", async () => {
	try {
		const response = await AuthService.checkAuth();
		localStorage.setItem("token", response.data.accessToken);
		return { user: response.data.user };
	} catch (error) {
		const errorMessage = (error as any).response?.data?.message;
		return { error: errorMessage };
	}
});

export const useErrorMessage = () =>
	useSelector(
		createSelector(
			(state: RootState) => state.session.errorMessage,
			(errorMessage: string | null) => errorMessage,
		),
	);

export const useUser = () =>
	useSelector(
		createSelector(
			(state: RootState) => state.session.user,
			(user: User | {}) => user,
		),
	);

export const useIsAuthorized = () =>
	useSelector(
		createSelector(
			(state: RootState) => state.session.isAuthorized,
			(isAuthorized: boolean) => isAuthorized,
		),
	);

export const useDataLoading = () =>
	useSelector(
		createSelector(
			(state: RootState) => state.session.isDataLoading,
			(isDataLoading: boolean) => isDataLoading,
		),
	);

export const setUser = createAction<string | null>("session/setUser");

export const setIsAuthorized = createAction<string | null>("session/setIsAuthorized");

export const setIsDataLoading = createAction<string | null>("session/setDataLoading");

export const setErrorMessage = createAction<string | null>("session/setErrorMessage");

export const reducer = sessionModel.reducer;
