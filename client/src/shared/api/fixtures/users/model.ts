export type User = {
	role: "admin" | "user";
	name: string;
	surname: string;
	address: string;
	email: string;
	isActivated: boolean;
	id: string;
};
