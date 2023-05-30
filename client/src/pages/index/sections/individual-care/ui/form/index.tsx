import { FormEvent, ChangeEvent, useReducer } from "react";
import { createPortal } from "react-dom";
import classNames from "classnames";

import { Input, Select, Snackbar } from "shared/ui";
import { useDebounce } from "shared/lib/hooks";
import { reducer, initialFormState } from "./model/store";
import {
	changingNameAction,
	changingSurnameAction,
	changingEmailAction,
	changingAgeAction,
	selectingLifestyleAction,
	selectingSkintypeAction,
	selectingLocationAction,
} from "./model/actions";
import { isFormValid } from "./model";
import "./styles.scss";

const ModalForm = () => {
	const [state, dispatch] = useReducer(reducer, initialFormState);
	const [debouncedState] = useDebounce(state, 2000);

	function handleFormSubmit(event: FormEvent) {
		event.preventDefault();
		console.log("submitted");
	}

	const nameInputClasses = classNames({
		"bg-red-100":
			state.nameInput.validLength === false && state.nameInput.validPattern === false,
		"hover:bg-red-100":
			state.nameInput.validLength === false && state.nameInput.validPattern === false,
	});

	const surnameInputClasses = classNames({
		"bg-red-100":
			state.surnameInput.validLength === false && state.surnameInput.validPattern === false,
		"hover:bg-red-100":
			state.surnameInput.validLength === false && state.surnameInput.validPattern === false,
	});

	const emailInputClasses = classNames({
		"bg-red-100":
			state.emailInput.validLength === false && state.emailInput.validPattern === false,
		"hover:bg-red-100":
			state.emailInput.validLength === false && state.emailInput.validPattern === false,
	});

	const ageInputClasses = classNames({
		"bg-red-100": state.ageInput.validRange === false,
		"hover:bg-red-100": state.ageInput.validRange === false,
	});

	const lifestyleSelectClasses = classNames({
		"bg-red-100": state.lifeStyleSelect.validOption === false,
		"hover:bg-red-100": state.lifeStyleSelect.validOption === false,
	});

	const skintypeSelectClasses = classNames({
		"bg-red-100": state.skinTypeSelect.validOption === false,
		"hover:bg-red-100": state.skinTypeSelect.validOption === false,
	});

	const locationSelectClasses = classNames({
		"bg-red-100": state.locationSelect.validOption === false,
		"hover:bg-red-100": state.locationSelect.validOption === false,
	});

	const submitButtonClasses = classNames({
		"button-disabled": !isFormValid(state),
	});

	return (
		<form
			onSubmit={handleFormSubmit}
			className={"flex flex-col gap-y-[1rem]"}
			action="#"
			method="post"
		>
			<div className={"flex flex-col gap-y-[1rem] gap-x-[1rem] min-[500px]:flex-row"}>
				<Input
					inputType="text"
					inputId="name"
					inputName="name"
					labelContent="Имя"
					labelFor="name"
					inputValue={state.nameInput.value}
					classes={nameInputClasses}
					onInputChange={(event: ChangeEvent<HTMLInputElement>) =>
						dispatch(changingNameAction(event.target?.value))
					}
				/>
				{debouncedState.nameInput.validLength === false &&
					createPortal(
						<Snackbar
							type={"error"}
							message={"Слишком короткое имя"}
							autoCloseDuration={"4000"}
						/>,
						document.getElementById("snackbars-container") as Element,
					)}
				{debouncedState.nameInput.validPattern === false &&
					createPortal(
						<Snackbar
							type={"error"}
							message={"Имя может содержать только латиницу или кириллицу"}
							autoCloseDuration={"4000"}
						/>,
						document.getElementById("snackbars-container") as Element,
					)}
				<Input
					inputType="text"
					inputId="surname"
					inputName="surname"
					labelContent="Фамилия"
					labelFor="surname"
					inputValue={state.surnameInput.value}
					classes={surnameInputClasses}
					onInputChange={(event: ChangeEvent<HTMLInputElement>) =>
						dispatch(changingSurnameAction(event.target?.value))
					}
				/>
				{debouncedState.surnameInput.validLength === false &&
					createPortal(
						<Snackbar
							type={"error"}
							message={"Слишком короткая фамилия"}
							autoCloseDuration={"4000"}
						/>,
						document.getElementById("snackbars-container") as Element,
					)}
				{debouncedState.surnameInput.validPattern === false &&
					createPortal(
						<Snackbar
							type={"error"}
							message={"Фамилия может содержать только латиницу или кириллицу"}
							autoCloseDuration={"4000"}
						/>,
						document.getElementById("snackbars-container") as Element,
					)}
			</div>
			<Input
				inputType="email"
				inputId="email"
				inputName="email"
				labelContent="Электронная почта"
				labelFor="email"
				inputValue={state.emailInput.value}
				classes={emailInputClasses}
				onInputChange={(event: ChangeEvent<HTMLInputElement>) =>
					dispatch(changingEmailAction(event.target?.value))
				}
			/>
			{debouncedState.emailInput.validLength === false &&
				createPortal(
					<Snackbar
						type={"error"}
						message={"Слишком короткий адрес электронной почты"}
						autoCloseDuration={"4000"}
					/>,
					document.getElementById("snackbars-container") as Element,
				)}
			{debouncedState.emailInput.validPattern === false &&
				createPortal(
					<Snackbar
						type={"error"}
						message={"Указан неверный адрес электронной почты"}
						autoCloseDuration={"4000"}
					/>,
					document.getElementById("snackbars-container") as Element,
				)}
			<Input
				inputType="number"
				inputId="age"
				inputName="age"
				labelContent="Возраст"
				labelFor="age"
				inputValue={state.ageInput.value}
				classes={ageInputClasses}
				onInputChange={(event: ChangeEvent<HTMLInputElement>) =>
					dispatch(changingAgeAction(event.target?.value))
				}
			/>
			{debouncedState.ageInput.validRange === false &&
				createPortal(
					<Snackbar
						type={"error"}
						message={"Указан неверный возраст."}
						autoCloseDuration={"4000"}
					/>,
					document.getElementById("snackbars-container") as Element,
				)}
			<div className={"flex flex-col gap-y-[1rem] gap-x-[1rem] min-[500px]:flex-row"}>
				<Select
					selectName="life-style"
					selectId="life-style"
					labelContent="Образ жизни"
					labelFor="life-style"
					selectValue={state.lifeStyleSelect.value}
					classes={lifestyleSelectClasses}
					onSelectChange={(event: ChangeEvent<HTMLInputElement>) =>
						dispatch(selectingLifestyleAction(event.target?.value))
					}
				>
					<option value=""></option>
					<option value="active">Активный</option>
					<option value="abstemious">Умеренный</option>
					<option value="passive">Пассивный</option>
				</Select>
				{debouncedState.lifeStyleSelect.validOption === false &&
					createPortal(
						<Snackbar
							type={"error"}
							message={"Поле образа жизни не может быть пустым."}
							autoCloseDuration={"4000"}
						/>,
						document.getElementById("snackbars-container") as Element,
					)}
				<Select
					selectName="skin-type"
					selectId="skin-type"
					labelContent="Тип кожи"
					labelFor="skin-type"
					selectValue={state.skinTypeSelect.value}
					classes={skintypeSelectClasses}
					onSelectChange={(event: ChangeEvent<HTMLInputElement>) =>
						dispatch(selectingSkintypeAction(event.target?.value))
					}
				>
					<option value=""></option>
					<option value="normal">Нормальная</option>
					<option value="dry">Сухая</option>
					<option value="oily">Жирная</option>
					<option value="combined">Комбинированная</option>
				</Select>
				{debouncedState.skinTypeSelect.validOption === false &&
					createPortal(
						<Snackbar
							type={"error"}
							message={"Поле типа кожи не может быть пустым."}
							autoCloseDuration={"4000"}
						/>,
						document.getElementById("snackbars-container") as Element,
					)}
				<Select
					selectName="location"
					selectId="location"
					labelContent="Место жительства"
					labelFor="location"
					selectValue={state.locationSelect.value}
					classes={locationSelectClasses}
					onSelectChange={(event: ChangeEvent<HTMLInputElement>) =>
						dispatch(selectingLocationAction(event.target?.value))
					}
				>
					<option value=""></option>
					<option value="city">Город</option>
					<option value="suburb">Пригород</option>
					<option value="village">Деревня</option>
				</Select>
				{debouncedState.locationSelect.validOption === false &&
					createPortal(
						<Snackbar
							type={"error"}
							message={"Поле место жительства не может быть пустым."}
							autoCloseDuration={"4000"}
						/>,
						document.getElementById("snackbars-container") as Element,
					)}
			</div>
			<button
				className={
					submitButtonClasses +
					" rounded-[0.2rem] p-4 font-raleway text-blue-zodiac-950 " +
					"text-sm-12px bg-athens-gray-50 hover:bg-athens-gray-100 " +
					"font-medium duration-500 ease-out flex-shrink-0 flex-grow-0 " +
					"h-[5.5rem]"
				}
				type="submit"
				disabled={!isFormValid(state)}
			>
				Отправить
			</button>
		</form>
	);
};

export default ModalForm;
