import { User } from "shared/api";

export type RootState = {
	session: {
		user: User | {};
		isAuthorized: boolean;
		dataLoading: boolean;
	};
};

export type Credentials = { email: string; password: string };
