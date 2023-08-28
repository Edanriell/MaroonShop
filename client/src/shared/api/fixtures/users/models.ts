export type User = {
	email: string;
	isActivated: boolean;
	id: string;
};

export type AuthResponse = {
	accessToken: string;
	refreshToken: string;
	user: User;
};
