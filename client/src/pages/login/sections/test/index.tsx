import { FC, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { sessionModel } from "entities/session";

import { UserService } from "shared/services";
import { User } from "shared/api";

const Test: FC = () => {
	const isLoading = useSelector((state) => (state as any).session.dataLoading);
	const user = useSelector((state) => (state as any).session.user);
	const isAuthorized = useSelector((state) => (state as any).session.isAuthorized);

	const [users, setUsers] = useState<User[]>([]);

	useEffect(() => {
		if (localStorage.getItem("token")) {
			sessionModel.checkAuth();
		}
	}, []);

	async function getUsers() {
		try {
			const response = await UserService.fetchUsers();
			setUsers(response.data);
		} catch (e) {
			console.log(e);
		}
	}

	if (isLoading) {
		return <div>Загрузка...</div>;
	}

	if (isAuthorized) {
		return (
			<div>
				<button onClick={getUsers}>Получить пользователей</button>
			</div>
		);
	}

	return (
		<div>
			<h1>{isAuthorized ? `Пользователь авторизован ${user.email}` : "АВТОРИЗУЙТЕСЬ"}</h1>
			<h1>{user.isActivated ? "Аккаунт подтвержден по почте" : "ПОДТВЕРДИТЕ АККАУНТ!!!!"}</h1>
			<button onClick={() => sessionModel.logout()}>Выйти</button>
			<div>
				<button onClick={getUsers}>Получить пользователей</button>
			</div>
			{users.map((user) => (
				<div key={user.email}>{user.email}</div>
			))}
		</div>
	);
};

export default Test;
