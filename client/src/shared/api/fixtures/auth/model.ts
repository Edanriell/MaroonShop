import { User } from "../users/model";

export type AuthResponse = {
	accessToken: string;
	refreshToken: string;
	user: User;
};
