import { AxiosResponse } from "axios";

import { authApi, AuthResponse } from "shared/api";

import { LoginParams, RegistrationParams } from "./types";

class AuthService {
	static async login({ email, password }: LoginParams): Promise<AxiosResponse<AuthResponse>> {
		return authApi.auth.userLogin({ email, password });
	}

	static async registration({
		name,
		surname,
		address,
		email,
		password,
	}: RegistrationParams): Promise<AxiosResponse<AuthResponse>> {
		return authApi.auth.userRegistration({ name, surname, address, email, password });
	}

	static async logout(): Promise<void> {
		return authApi.auth.userLogout();
	}

	static async checkAuth(): Promise<AxiosResponse<AuthResponse>> {
		return authApi.auth.userCheckAuth();
	}
}

export default AuthService;
