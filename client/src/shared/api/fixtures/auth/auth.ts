import type { AxiosResponse } from "axios";

import { apiInstance } from "./base";
import type { AuthResponse } from "./model";

import { userLoginParams, userRegistrationParams } from "./types";

const BASE_LOGIN_URL = "/api/login";
const BASE_REGISTRATION_URL = "/api/registration";
const BASE_LOGOUT_URL = "/api/logout";
const BASE_REFRESH_URL = "/api/refresh";

export const userLogin = ({
	email,
	password,
}: userLoginParams): Promise<AxiosResponse<AuthResponse>> => {
	return apiInstance.post<AuthResponse>(BASE_LOGIN_URL, { email, password });
};

export const userRegistration = ({
	name,
	surname,
	address,
	email,
	password,
}: userRegistrationParams): Promise<AxiosResponse<AuthResponse>> => {
	return apiInstance.post<AuthResponse>(BASE_REGISTRATION_URL, {
		name,
		surname,
		address,
		email,
		password,
	});
};

export const userLogout = (): Promise<void> => {
	return apiInstance.post(BASE_LOGOUT_URL);
};

export const userCheckAuth = (): Promise<AxiosResponse<AuthResponse>> => {
	return apiInstance.get<AuthResponse>(BASE_REFRESH_URL);
};
