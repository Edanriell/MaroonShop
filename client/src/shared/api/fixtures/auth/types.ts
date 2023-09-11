export type userLoginParams = {
	email: string;
	password: string;
};

export type userRegistrationParams = userLoginParams & {
	name: string;
	surname: string;
	address: string;
};
