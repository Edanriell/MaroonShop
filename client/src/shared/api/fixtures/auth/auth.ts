import type { AxiosResponse } from "axios";

import { apiInstance } from "./base";
import type { AuthResponse } from "./model";

const BASE_LOGIN_URL = "/api/login";
const BASE_REGISTRATION_URL = "/api/registration";
const BASE_LOGOUT_URL = "/api/logout";

export const userLogin = (
	email: string,
	password: string,
): Promise<AxiosResponse<AuthResponse>> => {
	return apiInstance.post<AuthResponse>(BASE_LOGIN_URL, { email, password });
};

export const userRegistration = (
	email: string,
	password: string,
): Promise<AxiosResponse<AuthResponse>> => {
	return apiInstance.post<AuthResponse>(BASE_REGISTRATION_URL, { email, password });
};

export const userLogout = (): Promise<void> => {
	return apiInstance.post(BASE_LOGOUT_URL);
};
