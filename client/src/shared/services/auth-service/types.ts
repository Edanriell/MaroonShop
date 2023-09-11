export type LoginParams = {
	email: string;
	password: string;
};

export type RegistrationParams = LoginParams & {
	name: string;
	surname: string;
	address: string;
};
