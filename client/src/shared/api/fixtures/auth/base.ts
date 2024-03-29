import axios from "axios";

import { API_URL } from "../../../config";

import { AuthResponse } from "./model";

export const apiInstance = axios.create({
	withCredentials: true,
	baseURL: API_URL,
});

apiInstance.interceptors.request.use((config) => {
	config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
	return config;
});

apiInstance.interceptors.response.use(
	(config) => {
		return config;
	},
	async (error) => {
		const originalRequest = error.config;
		if (error.response.status === 401 && error.config && !error.config._isRetry) {
			originalRequest._isRetry = true;
			try {
				const response = await axios.get<AuthResponse>(`${API_URL}/api/refresh`, {
					withCredentials: true,
				});
				localStorage.setItem("token", response.data.accessToken);
				return apiInstance.request(originalRequest);
			} catch (error) {
				// eslint-disable-next-line no-console
				console.error("Пользователь не авторизован.");
			}
		}
		throw error;
	},
);
