import { AxiosResponse } from "axios";

import { usersApi, AuthResponse } from "shared/api";

class AuthService {
	static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
		return usersApi.users.userLogin(email, password);
	}

	static async registration(
		email: string,
		password: string,
	): Promise<AxiosResponse<AuthResponse>> {
		return usersApi.users.userRegistration(email, password);
	}

	static async logout(): Promise<void> {
		return usersApi.users.userLogout();
	}
}

export default AuthService;
