import { FC, useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";

import { sessionModel } from "entities/session";

import { Button, Input } from "shared/ui";
import { UserService } from "shared/services";
import { User } from "shared/api";

import { ProfileProps } from "./types";

import styles from "./styles.module.scss";

const Profile: FC<ProfileProps> = ({ title }) => {
	const dispatch: ThunkDispatch<any, null, AnyAction> = useDispatch();

	const user = sessionModel.useUser();
	const isAuthorized = sessionModel.useIsAuthorized();

	const [users, setUsers] = useState<User[]>([]);

	useLayoutEffect(() => {
		if (localStorage.getItem("token")) {
			dispatch(sessionModel.checkAuth());
		}
	}, [dispatch]);

	function logoutTest() {
		// console.log("clicked");
		dispatch(sessionModel.logout());
	}

	async function getUsers() {
		try {
			const response = await UserService.fetchUsers();
			setUsers(response.data);
		} catch (e) {
			console.error(e);
		}
	}

	const renderUnauthorizedUser = () => (
		<div>
			<p className={"font-raleway text-center text-sm-16px ml-[2rem] mr-[2rem]"}>
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
		<div className={"flex flex-col items-center gap-y-[1rem] w-[42rem]"}>
			{/* <p>
				{isAuthorized
					? `Пользователь авторизован ${(user as User)?.email}`
					: "АВТОРИЗУЙТЕСЬ"}
			</p>
			<p>
				{(user as User)?.isActivated
					? "Аккаунт подтвержден по почте"
					: "ПОДТВЕРДИТЕ АККАУНТ!!!!"}
			</p>
			<p>User Name: {(user as User)?.name}</p>
			<p>User Surname: {(user as User)?.surname}</p>
			<p>User Address: {(user as User)?.address}</p>
			<button onClick={() => logoutTest()}>Выйти</button>
			<div>
				<button onClick={getUsers}>Получить пользователей</button>
			</div>
			{users.map((user) => (
				<div key={user.email}>{user.email}</div>
			))}
			{errorMessage &&
				createPortal(
					<Snackbar type={"error"} message={errorMessage} autoCloseDuration={"4000"} />,
					document.getElementById("snackbars-container") as Element,
				)} */}
			<Input
				type="text"
				inputId="name"
				inputName="name"
				labelContent="Имя"
				labelFor="name"
				inputValue={(user as User)?.name}
				readOnly={true}
				className={styles.input}
			/>
			<Input
				type="text"
				inputId="surname"
				inputName="surname"
				labelContent="Фамилия"
				labelFor="surname"
				inputValue={(user as User)?.surname}
				readOnly={true}
				className={styles.input}
			/>
			<Input
				type="text"
				inputId="address"
				inputName="address"
				labelContent="Адрес"
				labelFor="address"
				inputValue={(user as User)?.address}
				readOnly={true}
				className={styles.input}
			/>
			<div className={"flex flex-col w-[42rem] gap-y-[0.5rem]"}>
				<Input
					type="email"
					inputId="email"
					inputName="email"
					labelContent="Адрес электронной почты"
					labelFor="email"
					inputValue={(user as User)?.email}
					readOnly={true}
					className={styles.input}
				/>
				{(user as User)?.isActivated
					? "Аккаунт подтвержден по почте"
					: "ПОДТВЕРДИТЕ АККАУНТ!!!!"}
			</div>
			<Button
				className={"mt-[5rem]"}
				type="button"
				text={"Выйти"}
				onClick={() => logoutTest()}
			/>
		</div>
	);

	return (
		<section className="flex flex-col items-center mt-[30vh] mb-[40vh]">
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
