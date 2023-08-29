import { FC, useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";

import { sessionModel } from "entities/session";

import { UserService } from "shared/services";
import { User } from "shared/api";

const Test: FC = () => {
	const dispatch: ThunkDispatch<any, null, AnyAction> = useDispatch();

	const isLoading = useSelector((state) => (state as any).session.dataLoading);
	const user = useSelector((state) => (state as any).session.user);
	const isAuthorized = useSelector((state) => (state as any).session.isAuthorized);

	const [users, setUsers] = useState<User[]>([]);

	useEffect(() => {
		if (localStorage.getItem("token")) {
			dispatch(sessionModel.checkAuth());
		}
	}, []);

	useEffect(() => {
		console.log(`${isLoading} isLoading`);
		console.log(`${user} user`);
		console.log(user);
		console.log(`${isAuthorized} isAuthorized`);
	});

	async function getUsers() {
		try {
			const response = await UserService.fetchUsers();
			console.log("=====getUsersResponse=====");
			console.log(response);
			console.log("=====getUsersResponse=====");
			setUsers(response.data);
		} catch (e) {
			console.log(e);
		}
	}

	async function logoutTest() {
		console.log("clicked");
		dispatch(sessionModel.logout());
	}

	if (isLoading) {
		return <div>Загрузка...</div>;
	}

	// if (isAuthorized) {
	// 	return (
	// 		<div>
	// 			<button onClick={getUsers}>Получить пользователей</button>
	// 		</div>
	// 	);
	// }

	return (
		<div>
			<button onClick={() => logoutTest()}>Выйти</button>
			<h1>{isAuthorized ? `Пользователь авторизован ${user.email}` : "АВТОРИЗУЙТЕСЬ"}</h1>
			<h1>{user.isActivated ? "Аккаунт подтвержден по почте" : "ПОДТВЕРДИТЕ АККАУНТ!!!!"}</h1>
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
