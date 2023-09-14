export type UserData = {
	name: string;
	surname: string;
	address: string;
	email: string;
};

export type UserDataUpdateParams = {
	id: string;
	name?: string;
	surname?: string;
	address?: string;
	email?: string;
};
