import { ChangeEvent, FC, FormEvent, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";

import { sessionModel } from "entities/session";

import { Input, Button, Snackbar } from "shared/ui";

import styles from "./styles.module.scss";

const LoginForm: FC = () => {
	const dispatch: ThunkDispatch<any, null, AnyAction> = useDispatch();
	const navigate = useNavigate();

	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const errorMessage = sessionModel.useErrorMessage();

	const isAuthorized = sessionModel.useIsAuthorized();

	// REFACTOR THIS Trash
	useEffect(() => {
		if (isAuthorized) {
			console.log("works");
			navigate("/profile");
		}
	}, [navigate, isAuthorized]);

	const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	};

	const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	};

	const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		dispatch(sessionModel.login({ email, password }));

		dispatch(sessionModel.setErrorMessage(null));
	};

	return (
		<form onSubmit={handleFormSubmit}>
			<div className={"flex flex-col items-center sm:w-[24rem] md:w-[32rem]"}>
				<div className={"flex flex-col items-center gap-y-[1.2rem] w-full"}>
					<Input
						type="email"
						inputId="email"
						inputName="email"
						labelContent="Адрес электронной почты"
						labelFor="email"
						inputValue={email}
						onInputChange={handleEmailChange}
						className={styles.emailInput}
					/>
					<Input
						type="password"
						inputId="password"
						inputName="password"
						labelContent="Пароль"
						labelFor="password"
						inputValue={password}
						onInputChange={handlePasswordChange}
						className={styles.passwordInput}
					/>
				</div>
				<Button className={"mt-[6rem]"} type="submit" text={"Войти"} />
			</div>
			{errorMessage &&
				createPortal(
					<Snackbar type={"error"} message={errorMessage} autoCloseDuration={"4000"} />,
					document.getElementById("snackbars-container") as Element,
				)}
		</form>
	);
};

export default LoginForm;
