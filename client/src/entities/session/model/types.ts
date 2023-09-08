import { User } from "shared/api";

export type RootState = {
	session: {
		user: User | {};
		isAuthorized: boolean;
		dataLoading: boolean;
		errorMessage: string | null;
	};
};

export type Credentials = {
	email: string;
	password: string;
};

export type RegistrationCredentials = {
	name: string;
	surname: string;
	address: string;
	email: string;
	password: string;
};
