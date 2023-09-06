import { FC, useEffect, useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";

import { sessionModel } from "entities/session";

import { UserService } from "shared/services";
import { User } from "shared/api";

import { ProfileProps } from "./types";

const Profile: FC<ProfileProps> = ({ title }) => {
	const dispatch: ThunkDispatch<any, null, AnyAction> = useDispatch();

	const user = sessionModel.useUser();
	const isAuthorized = sessionModel.useIsAuthorized();

	const [users, setUsers] = useState<User[]>([]);

	// Not sure about layout effect here....
	useLayoutEffect(() => {
		if (localStorage.getItem("token")) {
			dispatch(sessionModel.checkAuth());
		}
	}, [dispatch]);

	useEffect(() => {
		console.log(user);
		console.log(`${isAuthorized} isAuthorized`);
	});

	function logoutTest() {
		console.log("clicked");
		dispatch(sessionModel.logout());
	}

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

	const renderUnauthorizedUser = () => (
		<div>
			<p className={"font-raleway text-center"}>
				Только автаризованные пользователи могут видеть эту страницу.
			</p>
			<div className={"mt-[6rem] flex flex-row items-center justify-center w-full"}>
				<p className={"font-mPlus font-medium text-sm-12px mr-[1rem]"}>Есть аккаунт?</p>
				<Link to={"/login"} className={"font-mPlus font-semibold text-sm-12px"}>
					Войти
				</Link>
			</div>
			<div className={"mt-[2.4rem] flex flex-row items-center justify-center w-full"}>
				<p className={"font-mPlus font-medium text-sm-12px mr-[1rem]"}>Нет аккаунта?</p>
				<Link to={"/registration"} className={"font-mPlus font-semibold text-sm-12px"}>
					Зарегистрироваться
				</Link>
			</div>
		</div>
	);

	const renderAuthorizedUser = () => (
		<div>
			<p>
				{isAuthorized
					? `Пользователь авторизован ${(user as User)?.email}`
					: "АВТОРИЗУЙТЕСЬ"}
			</p>
			<p>
				{(user as User)?.isActivated
					? "Аккаунт подтвержден по почте"
					: "ПОДТВЕРДИТЕ АККАУНТ!!!!"}
			</p>
			<button onClick={() => logoutTest()}>Выйти</button>
			<div>
				<button onClick={getUsers}>Получить пользователей</button>
			</div>
			{users.map((user) => (
				<div key={user.email}>{user.email}</div>
			))}
		</div>
	);

	return (
		<section className="flex flex-col items-center mt-[6rem] mb-[12rem]">
			<h2
				className={
					"font-raleway font-normal text-sm-28px text-center text-blue-zodiac-950 " +
					"md:text-md-36px mb-[6rem]"
				}
			>
				{title}
			</h2>
			{!isAuthorized && renderUnauthorizedUser()}
			{isAuthorized && renderAuthorizedUser()}
		</section>
	);
};

export default Profile;
