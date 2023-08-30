import { ChangeEvent, FC, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";

import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";

import { sessionModel } from "entities/session";

const LoginForm: FC = () => {
	const dispatch: ThunkDispatch<any, null, AnyAction> = useDispatch();

	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	};

	const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	};

	const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		dispatch(sessionModel.login({ email, password }));
	};

	return (
		<form onSubmit={handleFormSubmit}>
			<div className="flex flex-col items-center">
				<input
					onChange={handleEmailChange}
					value={email}
					type="email"
					placeholder="Адрес электронной почты"
				/>
				<input
					onChange={handlePasswordChange}
					value={password}
					type="password"
					placeholder="Пароль"
				/>
				<button type="submit">Войти</button>
			</div>
		</form>
	);
};

export default LoginForm;
