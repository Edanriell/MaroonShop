import { FormEvent, ChangeEvent, useReducer } from "react";
import { createPortal } from "react-dom";
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

const ModalForm = () => {
	const [state, dispatch] = useReducer(reducer, initialFormState);
	const [debouncedState] = useDebounce(state, 2000);

	function handleFormSubmit(event: FormEvent) {
		event.preventDefault();
	}

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
					onInputChange={(event: ChangeEvent<HTMLInputElement>) =>
						dispatch(changingNameAction(event.target?.value))
					}
				/>
				{!debouncedState.nameInput.validLength &&
					createPortal(<Snackbar />, document.getElementById("snackbars") as Element)}
				<Input
					inputType="text"
					inputId="surname"
					inputName="surname"
					labelContent="Фамилия"
					labelFor="surname"
					inputValue={state.surnameInput.value}
					onInputChange={(event: ChangeEvent<HTMLInputElement>) =>
						dispatch(changingSurnameAction(event.target?.value))
					}
				/>
			</div>
			<Input
				inputType="email"
				inputId="email"
				inputName="email"
				labelContent="Электронная почта"
				labelFor="email"
				inputValue={state.emailInput.value}
				onInputChange={(event: ChangeEvent<HTMLInputElement>) =>
					dispatch(changingEmailAction(event.target?.value))
				}
			/>
			<Input
				inputType="number"
				inputId="age"
				inputName="age"
				labelContent="Возраст"
				labelFor="age"
				inputValue={state.ageInput.value}
				onInputChange={(event: ChangeEvent<HTMLInputElement>) =>
					dispatch(changingAgeAction(event.target?.value))
				}
			/>
			<div className={"flex flex-col gap-y-[1rem] gap-x-[1rem] min-[500px]:flex-row"}>
				<Select
					selectName="life-style"
					selectId="life-style"
					labelContent="Образ жизни"
					labelFor="life-style"
					selectValue={state.lifeStyleSelect.value}
					onSelectChange={(event: ChangeEvent<HTMLInputElement>) =>
						dispatch(selectingLifestyleAction(event.target?.value))
					}
				>
					<option value=""></option>
					<option value="active">Активный</option>
					<option value="abstemious">Умеренный</option>
					<option value="passive">Пассивный</option>
				</Select>
				<Select
					selectName="skin-type"
					selectId="skin-type"
					labelContent="Тип кожи"
					labelFor="skin-type"
					selectValue={state.skinTypeSelect.value}
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
				<Select
					selectName="location"
					selectId="location"
					labelContent="Место жительства"
					labelFor="location"
					selectValue={state.locationSelect.value}
					onSelectChange={(event: ChangeEvent<HTMLInputElement>) =>
						dispatch(selectingLocationAction(event.target?.value))
					}
				>
					<option value=""></option>
					<option value="city">Город</option>
					<option value="suburb">Пригород</option>
					<option value="village">Деревня</option>
				</Select>
			</div>
		</form>
	);
};

export default ModalForm;
