import type { AxiosResponse } from "axios";

import { apiInstance } from "./base";
import type { User } from "./model";

const BASE_URL = "/api/users";

export const getAllUsers = (): Promise<AxiosResponse<User[]>> => {
	return apiInstance.get<User[]>(BASE_URL);
};
