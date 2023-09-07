import { FC, useLayoutEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";

import RegistrationForm from "features/registration-form";

import { sessionModel } from "entities/session";

import { RegistrationProps } from "./types";

const Registration: FC<RegistrationProps> = ({ title }) => {
	const navigate = useNavigate();
	const dispatch: ThunkDispatch<any, null, AnyAction> = useDispatch();

	const isUserAuthorized = sessionModel.useIsAuthorized();

	useLayoutEffect(() => {
		if (localStorage.getItem("token")) {
			dispatch(sessionModel.checkAuth());
		}
	}, [dispatch]);

	useLayoutEffect(() => {
		if (isUserAuthorized) navigate("/profile");
	}, [isUserAuthorized, navigate]);

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
			<RegistrationForm />
			<div className={"mt-[2.4rem] flex flex-row items-center justify-center w-full"}>
				<p className={"font-mPlus font-medium text-sm-12px mr-[1rem]"}>Есть аккаунт?</p>
				<Link to={"/login"} className={"font-mPlus font-semibold text-sm-12px"}>
					Войти
				</Link>
			</div>
		</section>
	);
};

export default Registration;
