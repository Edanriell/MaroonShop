import { AxiosResponse } from "axios";

import { authApi, AuthResponse } from "shared/api";

class AuthService {
	static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
		return authApi.auth.userLogin(email, password);
	}

	static async registration(
		email: string,
		password: string,
	): Promise<AxiosResponse<AuthResponse>> {
		return authApi.auth.userRegistration(email, password);
	}

	static async logout(): Promise<void> {
		return authApi.auth.userLogout();
	}
}

export default AuthService;
