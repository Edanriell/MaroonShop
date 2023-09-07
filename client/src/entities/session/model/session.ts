import {
	createSlice,
	PayloadAction,
	createAsyncThunk,
	createSelector,
	createAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";

import { AuthService } from "shared/services";
import { User, AuthResponse } from "shared/api";

import { Credentials, RootState } from "./types";

export const initialState: {
	user: User | {};
	isAuthorized: boolean;
	dataLoading: boolean;
	errorMessage: string | null;
} = {
	user: {},
	isAuthorized: false,
	dataLoading: false,
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
			state.dataLoading = payload;
		},
		setErrorMessage: (state, { payload }: PayloadAction<string | null>) => {
			state.errorMessage = payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(login.pending, (state) => {
			state.dataLoading = true;
		});
		builder.addCase(login.fulfilled, (state, { payload }) => {
			if ("error" in payload) {
				state.errorMessage = payload.error;
			} else if ("user" in payload) {
				state.user = payload.user as User;
				state.isAuthorized = true;
			}
			state.dataLoading = false;
		});
		builder.addCase(login.rejected, (state, { payload }) => {
			state.dataLoading = false;
		});

		builder.addCase(registration.pending, (state) => {
			state.dataLoading = true;
		});
		builder.addCase(registration.fulfilled, (state, { payload }) => {
			if ("error" in payload) {
				state.errorMessage = payload.error;
			} else if ("user" in payload) {
				state.user = payload.user as User;
				state.isAuthorized = true;
			}
			state.dataLoading = false;
		});
		builder.addCase(registration.rejected, (state) => {
			state.dataLoading = false;
		});

		builder.addCase(logout.pending, (state) => {
			state.dataLoading = true;
		});
		builder.addCase(logout.fulfilled, (state, { payload }) => {
			state.user = payload as User;
			state.isAuthorized = false;
			state.dataLoading = false;
		});
		builder.addCase(logout.rejected, (state) => {
			state.dataLoading = false;
		});

		builder.addCase(checkAuth.pending, (state) => {
			state.dataLoading = true;
		});
		builder.addCase(checkAuth.fulfilled, (state, { payload }) => {
			state.user = payload as User;
			state.isAuthorized = true;
			state.dataLoading = false;
		});
		builder.addCase(checkAuth.rejected, (state) => {
			state.dataLoading = false;
		});
	},
});

export const login = createAsyncThunk("session/login", async (credentials: Credentials) => {
	try {
		const response = await AuthService.login(credentials.email, credentials.password);
		localStorage.setItem("token", response.data.accessToken);
		return { user: response.data.user };
	} catch (error) {
		const errorMessage = (error as any).response?.data?.message;
		return { error: errorMessage };
	}
});

export const registration = createAsyncThunk(
	"session/registration",
	async (credentials: Credentials) => {
		try {
			const response = await AuthService.registration(
				credentials.email,
				credentials.password,
			);
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
		console.log("logout clicked");
		const response = await AuthService.logout();
		localStorage.removeItem("token");
		console.log(response);
		return {};
	} catch (error) {
		console.log((error as any).response?.data?.message);
	}
});

export const checkAuth = createAsyncThunk("session/checkAuth", async () => {
	try {
		const response = await axios.get<AuthResponse>(`http://localhost:4020/api/refresh`, {
			withCredentials: true,
		});
		console.log("Response from checkAuth");
		console.log(response);
		console.log("Response from checkAuth");
		localStorage.setItem("token", response.data.accessToken);
		return response.data.user;
	} catch (error) {
		console.log((error as any).response?.data?.message);
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
			(state: RootState) => state.session.dataLoading,
			(dataLoading: boolean) => dataLoading,
		),
	);

export const setUser = createAction<string | null>("session/setUser");

export const setIsAuthorized = createAction<string | null>("session/setIsAuthorized");

export const setDataLoading = createAction<string | null>("session/setDataLoading");

export const setErrorMessage = createAction<string | null>("session/setErrorMessage");

export const reducer = sessionModel.reducer;

// http://localhost:4020 needs to be pulled out.
