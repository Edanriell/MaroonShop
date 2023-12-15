import { FC, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";

import EditUserDataForm from "features/edit-user-data-form";

import { sessionModel } from "entities/session";

import { ProfileProps } from "./types";

import "./styles.scss";

const Profile: FC<ProfileProps> = ({ title }) => {
	const dispatch: ThunkDispatch<any, null, AnyAction> = useDispatch();

	const isAuthorized = sessionModel.useIsAuthorized();

	useLayoutEffect(() => {
		if (localStorage.getItem("token")) {
			dispatch(sessionModel.checkAuth());
		}
	}, [dispatch]);

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

	const renderAuthorizedUser = () => <EditUserDataForm />;

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
