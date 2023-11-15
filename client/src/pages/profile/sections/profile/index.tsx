import { FC, useState, useLayoutEffect, useReducer, ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createPortal } from "react-dom";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import classNames from "classnames";

import { sessionModel } from "entities/session";
import { userModel } from "entities/user";

import { Button, Input, Snackbar } from "shared/ui";
import { useDebounce } from "shared/lib/hooks";
import { User } from "shared/api";

import { reducer, initialFormState } from "./model/store";
import {
	changingNameAction,
	changingSurnameAction,
	changingAddressAction,
	changingEmailAction,
} from "./model/actions";
import { isFormValid } from "./model";

import { ProfileProps } from "./types";

import styles from "./styles.module.scss";
import "./styles.scss";

const Profile: FC<ProfileProps> = ({ title }) => {
	const [isProfileDataEditable, setIsProfileDataEditable] = useState<boolean>(false);

	const dispatch: ThunkDispatch<any, null, AnyAction> = useDispatch();

	const [state, formDispatch] = useReducer(reducer, initialFormState);
	const [debouncedState] = useDebounce(state, 2000);

	const user = sessionModel.useUser();
	const isAuthorized = sessionModel.useIsAuthorized();
	const operationResultMessage = userModel.useOperationResultMessage();

	useLayoutEffect(() => {
		if (localStorage.getItem("token")) {
			dispatch(sessionModel.checkAuth());
		}
	}, [dispatch]);

	useLayoutEffect(() => {
		formDispatch(changingNameAction((user as User)?.name || ""));
		formDispatch(changingSurnameAction((user as User)?.surname || ""));
		formDispatch(changingAddressAction((user as User)?.address || ""));
		formDispatch(changingEmailAction((user as User)?.email || ""));
	}, [operationResultMessage.error, user]);

	const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
		formDispatch(changingNameAction(event.target.value));
	};

	const handleSurnameChange = (event: ChangeEvent<HTMLInputElement>) => {
		formDispatch(changingSurnameAction(event.target.value));
	};

	const handleAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
		formDispatch(changingAddressAction(event.target.value));
	};

	const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
		formDispatch(changingEmailAction(event.target.value));
	};

	const handleLogoutClick = () => {
		dispatch(sessionModel.logout());
	};

	const handleResetClick = () => {
		setIsProfileDataEditable(!isProfileDataEditable);

		formDispatch(changingNameAction((user as User)?.name || ""));
		formDispatch(changingSurnameAction((user as User)?.surname || ""));
		formDispatch(changingAddressAction((user as User)?.address || ""));
		formDispatch(changingEmailAction((user as User)?.email || ""));
	};

	const handleProfileEditClick = () => {
		setIsProfileDataEditable(!isProfileDataEditable);
	};

	const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if ((user as User).name !== state.nameInput.value) {
			dispatch(
				userModel.updateUserData({
					id: (user as User).id,
					name: state.nameInput.value,
				}),
			);
		}

		if ((user as User).surname !== state.surnameInput.value) {
			dispatch(
				userModel.updateUserData({
					id: (user as User).id,
					surname: state.surnameInput.value,
				}),
			);
		}

		if ((user as User).address !== state.addressInput.value) {
			dispatch(
				userModel.updateUserData({
					id: (user as User).id,
					address: state.addressInput.value,
				}),
			);
		}

		if ((user as User).email !== state.emailInput.value) {
			dispatch(
				userModel.updateUserData({
					id: (user as User).id,
					email: state.emailInput.value,
				}),
			);
		}

		dispatch(userModel.clearOperationResultMessage(null));
	};

	const nameInputClasses = classNames({
		inputInvalid:
			state.nameInput.validLength === false || state.nameInput.validPattern === false,
	});

	const surnameInputClasses = classNames({
		inputInvalid:
			state.surnameInput.validLength === false || state.surnameInput.validPattern === false,
	});

	const addressInputClasses = classNames({
		inputInvalid: state.addressInput.validLength === false,
	});

	const emailInputClasses = classNames({
		inputInvalid:
			state.emailInput.validLength === false || state.emailInput.validPattern === false,
	});

	const submitButtonClasses = classNames({
		submitButtonInvalid: !isFormValid(state),
	});

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
		<form onSubmit={handleFormSubmit}>
			<div
				className={
					"flex flex-col items-center gap-y-[1rem] sm:w-[24rem] md:w-[32rem] lg:w-[42rem]"
				}
			>
				<Input
					type="text"
					inputId="name"
					inputName="name"
					labelContent="Имя"
					labelFor="name"
					inputValue={state.nameInput.value}
					readOnly={!isProfileDataEditable}
					onInputChange={handleNameChange}
					className={styles.input + " " + nameInputClasses}
				/>
				{debouncedState.nameInput.validLength === false &&
					createPortal(
						<Snackbar
							type={"error"}
							message={"Слишком короткое имя."}
							autoCloseDuration={"4000"}
						/>,
						document.getElementById("snackbars-container") as Element,
					)}
				{debouncedState.nameInput.validPattern === false &&
					createPortal(
						<Snackbar
							type={"error"}
							message={`Поле имя должно содержать только кириллицу или латиницу.`}
							autoCloseDuration={"4000"}
						/>,
						document.getElementById("snackbars-container") as Element,
					)}
				<Input
					type="text"
					inputId="surname"
					inputName="surname"
					labelContent="Фамилия"
					labelFor="surname"
					inputValue={state.surnameInput.value}
					readOnly={!isProfileDataEditable}
					onInputChange={handleSurnameChange}
					className={styles.input + " " + surnameInputClasses}
				/>
				{debouncedState.surnameInput.validLength === false &&
					createPortal(
						<Snackbar
							type={"error"}
							message={"Слишком короткая фамилия."}
							autoCloseDuration={"4000"}
						/>,
						document.getElementById("snackbars-container") as Element,
					)}
				{debouncedState.surnameInput.validPattern === false &&
					createPortal(
						<Snackbar
							type={"error"}
							message={`Поле фамилия должно содержать только кириллицу или латиницу.`}
							autoCloseDuration={"4000"}
						/>,
						document.getElementById("snackbars-container") as Element,
					)}
				<Input
					type="text"
					inputId="address"
					inputName="address"
					labelContent="Адрес"
					labelFor="address"
					inputValue={state.addressInput.value}
					readOnly={!isProfileDataEditable}
					onInputChange={handleAddressChange}
					className={styles.input + " " + addressInputClasses}
				/>
				{debouncedState.addressInput.validLength === false &&
					createPortal(
						<Snackbar
							type={"error"}
							message={"Слишком короткий адрес."}
							autoCloseDuration={"4000"}
						/>,
						document.getElementById("snackbars-container") as Element,
					)}
				<div
					className={
						"flex flex-col sm:w-[24rem] md:w-[32rem] lg:w-[42rem] gap-y-[0.5rem]"
					}
				>
					<Input
						type="email"
						inputId="email"
						inputName="email"
						labelContent="Адрес электронной почты"
						labelFor="email"
						inputValue={state.emailInput.value}
						readOnly={!isProfileDataEditable}
						onInputChange={handleEmailChange}
						className={styles.input + " " + emailInputClasses}
					/>
					{(user as User)?.isActivated ? (
						<p className={"font-raleway text-sm-12px ml-[0.2rem] text-green-900"}>
							Адрес электронной почты подтвержден.
						</p>
					) : (
						<p className={"font-raleway text-sm-12px ml-[0.2rem] text-red-900"}>
							Адрес электронной почты не подтвержден.
						</p>
					)}
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
				</div>
				{(user as User).role === "admin" && (
					<div className={"flex flex-row items-center mt-[2rem]"}>
						<Button
							type={"link-internal"}
							text={"Управление товарами"}
							linkInternal={`/products-management`}
						/>
					</div>
				)}
				<div className={"flex flex-row items-center gap-x-[1rem]"}>
					<Button
						className={"mt-[5rem] " + submitButtonClasses}
						type={isProfileDataEditable ? "button" : "submit"}
						text={isProfileDataEditable ? "Сохранить" : "Редактировать"}
						disabled={!isFormValid(state)}
						onClick={handleProfileEditClick}
					/>
					<Button
						className={"mt-[5rem]"}
						type="button"
						text={isProfileDataEditable ? "Отмена" : "Выйти"}
						onClick={isProfileDataEditable ? handleResetClick : handleLogoutClick}
					/>
				</div>
			</div>
			{operationResultMessage.success &&
				createPortal(
					<Snackbar
						type={"success"}
						message={operationResultMessage.success}
						autoCloseDuration={"4000"}
					/>,
					document.getElementById("snackbars-container") as Element,
				)}
			{operationResultMessage.error &&
				createPortal(
					<Snackbar
						type={"error"}
						message={operationResultMessage.error}
						autoCloseDuration={"4000"}
					/>,
					document.getElementById("snackbars-container") as Element,
				)}
		</form>
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
