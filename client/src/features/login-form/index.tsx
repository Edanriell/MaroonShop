import { ChangeEvent, FC, FormEvent, useReducer } from "react";
import { useDispatch } from "react-redux";
import { createPortal } from "react-dom";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import classNames from "classnames";

import { sessionModel } from "entities/session";

import { Input, Button, Snackbar } from "shared/ui";
import { useDebounce } from "shared/lib/hooks";

import { reducer, initialFormState } from "./model/store";
import { changingEmailAction, changingPasswordAction } from "./model/actions";
import { isFormValid } from "./model";

import styles from "./styles.module.scss";
import "./styles.scss";

const LoginForm: FC = () => {
	const sessionDispatch: ThunkDispatch<any, null, AnyAction> = useDispatch();

	const [state, formDispatch] = useReducer(reducer, initialFormState);
	const [debouncedState] = useDebounce(state, 2000);

	const errorMessage = sessionModel.useErrorMessage();

	const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
		formDispatch(changingEmailAction(event.target.value));
	};

	const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
		formDispatch(changingPasswordAction(event.target.value));
	};

	const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		sessionDispatch(
			sessionModel.login({
				email: state.emailInput.value,
				password: state.passwordInput.value,
			}),
		);
		sessionDispatch(sessionModel.setErrorMessage(null));
	};

	const emailInputClasses = classNames({
		inputInvalid:
			state.emailInput.validLength === false || state.emailInput.validPattern === false,
	});

	const passwordInputClasses = classNames({
		inputInvalid: state.passwordInput.validLength === false,
	});

	const submitButtonClasses = classNames({
		submitButtonInvalid: !isFormValid(state),
	});

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
						inputValue={state.emailInput.value}
						onInputChange={handleEmailChange}
						className={styles.input + " " + emailInputClasses}
					/>
					{debouncedState.emailInput.validLength === false &&
						createPortal(
							<Snackbar
								type={"error"}
								message={"Слишком короткий адрес электронной почты."}
								autoCloseDuration={"4000"}
							/>,
							document.getElementById("snackbars-container") as Element,
						)}
					{debouncedState.emailInput.validPattern === false &&
						createPortal(
							<Snackbar
								type={"error"}
								message={`Адрес электронной почты должен включать локальное имя
									(текст, который идет перед символом @), затем символ @ и имя домена
									(текст, который идет после символа @).`}
								autoCloseDuration={"8000"}
							/>,
							document.getElementById("snackbars-container") as Element,
						)}
					<Input
						type="password"
						inputId="password"
						inputName="password"
						labelContent="Пароль"
						labelFor="password"
						inputValue={state.passwordInput.value}
						onInputChange={handlePasswordChange}
						className={styles.input + " " + passwordInputClasses}
					/>
					{debouncedState.passwordInput.validLength === false &&
						createPortal(
							<Snackbar
								type={"error"}
								message={"Слишком короткий пороль."}
								autoCloseDuration={"4000"}
							/>,
							document.getElementById("snackbars-container") as Element,
						)}
				</div>
				<Button
					className={"mt-[6rem] " + submitButtonClasses}
					type="submit"
					text={"Войти"}
					disabled={!isFormValid(state)}
				/>
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
