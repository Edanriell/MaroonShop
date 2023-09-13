import { User } from "shared/api";

export type RootState = {
	session: {
		user: User | {};
		isAuthorized: boolean;
		isDataLoading: boolean;
		errorMessage: string | null;
	};
};

export type Credentials = {
	email: string;
	password: string;
};

export type RegistrationCredentials = Credentials & {
	name: string;
	surname: string;
	address: string;
};
