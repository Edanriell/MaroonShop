import { FC, useEffect, useLayoutEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";

import LoginForm from "features/login-form";

import { sessionModel } from "entities/session";

import { LoginProps } from "./types";

const Login: FC<LoginProps> = ({ title }) => {
	const navigate = useNavigate();
	const dispatch: ThunkDispatch<any, null, AnyAction> = useDispatch();

	const isUserAuthorized = sessionModel.useIsAuthorized();

	useLayoutEffect(() => {
		if (localStorage.getItem("token")) {
			dispatch(sessionModel.checkAuth());
		}
	}, [dispatch]);

	useEffect(() => {
		if (isUserAuthorized) navigate("/profile");
	});

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
			<LoginForm />
			<div className={"mt-[2.4rem] flex flex-row items-center justify-center w-full"}>
				<p className={"font-mPlus font-medium text-sm-12px mr-[1rem]"}>Нет аккаунта?</p>
				<Link to={"/registration"} className={"font-mPlus font-semibold text-sm-12px"}>
					Зарегистрироваться
				</Link>
			</div>
		</section>
	);
};

export default Login;
