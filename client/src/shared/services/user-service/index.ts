import { AxiosResponse } from "axios";

import { usersApi, User } from "shared/api";

class UserService {
	static fetchUsers(): Promise<AxiosResponse<User[]>> {
		return usersApi.users.getAllUsers();
	}
}

export default UserService;
