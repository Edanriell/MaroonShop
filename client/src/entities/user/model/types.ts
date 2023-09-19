import { User, Product } from "shared/api";

export type RootState = {
	user: {
		data: User[] | User;
		cart: Product[];
		operationResultMessage: { error: string | null; success: string | null };
		isDataLoading: boolean;
	};
};

export type UserData = {
	id: string;
	name?: string;
	surname?: string;
	address?: string;
	email?: string;
};

export type OperationResultMessage = {
	error: string | null;
	success: string | null;
};
