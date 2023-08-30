import {
	createSlice,
	PayloadAction,
	createAsyncThunk,
	createAction,
	createSelector,
} from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import axios from "axios";
import { schema, normalize } from "normalizr";

import { AuthService } from "shared/services";
import { User, AuthResponse } from "shared/api";

import { RootState, NormalizedUser, Credentials } from "./types";

export const userSchema = new schema.Entity<User>("user");

export const normalizeUser = (data: User) =>
	normalize<User, { user: NormalizedUser }>(data, userSchema);

export const initialState: {
	user: NormalizedUser | {};
	isAuthorized: boolean;
	dataLoading: boolean;
} = {
	user: {},
	isAuthorized: false,
	dataLoading: false,
};

export const sessionModel = createSlice({
	name: "session",
	initialState,
	reducers: {
		setUser: (state, { payload }: PayloadAction<User>) => {
			state.user = normalizeUser(payload).entities.user;
		},
		setIsAuthorized: (state, { payload }: PayloadAction<boolean>) => {
			state.isAuthorized = payload;
		},
		setDataLoading: (state, { payload }: PayloadAction<boolean>) => {
			state.dataLoading = payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(login.pending, (state) => {
			state.dataLoading = true;
		});
		builder.addCase(login.fulfilled, (state, { payload }) => {
			state.user = normalizeUser(payload as User).entities.user;
			state.isAuthorized = true;
			state.dataLoading = false;
		});
		builder.addCase(login.rejected, (state) => {
			state.dataLoading = false;
		});
		builder.addCase(registration.pending, (state) => {
			state.dataLoading = true;
		});
		builder.addCase(registration.fulfilled, (state, { payload }) => {
			state.user = normalizeUser(payload as User).entities.user;
			state.isAuthorized = true;
			state.dataLoading = false;
		});
		builder.addCase(registration.rejected, (state) => {
			state.dataLoading = false;
		});
		builder.addCase(logout.pending, (state) => {
			state.dataLoading = true;
		});
		builder.addCase(logout.fulfilled, (state, { payload }) => {
			state.user = normalizeUser(payload as User).entities.user;
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
			state.user = normalizeUser(payload as User).entities.user;
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
		console.log(response);
		localStorage.setItem("token", response.data.accessToken);
		return response.data.user;
	} catch (error) {
		console.log((error as any).response?.data?.message);
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
			console.log(response);
			localStorage.setItem("token", response.data.accessToken);
			return response.data.user;
		} catch (error) {
			console.log((error as any).response?.data?.message);
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
		console.log(response);
		localStorage.setItem("token", response.data.accessToken);
		return response.data.user;
	} catch (error) {
		console.log((error as any).response?.data?.message);
	}
});

export const reducer = sessionModel.reducer;

// All this code needs to be tested !
// http://localhost:4020 needs to be pulled out
