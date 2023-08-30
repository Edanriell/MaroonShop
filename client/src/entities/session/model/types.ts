import { User } from "shared/api";

export type NormalizedUser = Record<number, User>;

export type RootState = {
	session: {
		user: NormalizedUser | {};
		isAuthorized: boolean;
		dataLoading: boolean;
	};
};

export type Credentials = { email: string; password: string };
