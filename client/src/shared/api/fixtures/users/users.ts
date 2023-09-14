import type { AxiosResponse } from "axios";

import { apiInstance } from "./base";
import type { User } from "./model";

import { UserData, UserDataUpdateParams } from "./types";

const BASE_URL = "/api/users";
const BASE_USER_UPDATE_URL = "/api/update-user-data";

export const getAllUsers = (): Promise<AxiosResponse<User[]>> => {
	return apiInstance.get<User[]>(BASE_URL);
};

export const userDataUpdate = ({
	id,
	name,
	surname,
	address,
	email,
}: UserDataUpdateParams): Promise<AxiosResponse<any>> => {
	return apiInstance.put<UserData>(BASE_USER_UPDATE_URL, { id, name, surname, address, email });
};
