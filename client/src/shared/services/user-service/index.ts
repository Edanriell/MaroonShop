import { AxiosResponse } from "axios";

import { usersApi, User } from "shared/api";

import { UpdateUserDataParams } from "./types";

class UserService {
	static fetchUsers(): Promise<AxiosResponse<User[]>> {
		return usersApi.users.getAllUsers();
	}

	static async updateUserData({
		name,
		surname,
		address,
		email,
		id,
	}: UpdateUserDataParams): Promise<AxiosResponse<any>> {
		return usersApi.users.userDataUpdate({ id, name, surname, address, email });
	}
}

export default UserService;
