import { FormEvent, useReducer } from "react";
import { Input, Select } from "shared/ui";
import { reducer, initialFormState } from "./model";

const ModalForm = () => {
	const [state, dispatch] = useReducer(reducer, initialFormState);

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
				/>
				<Input
					inputType="text"
					inputId="surname"
					inputName="surname"
					labelContent="Фамилия"
					labelFor="surname"
				/>
			</div>
			<Input
				inputType="email"
				inputId="email"
				inputName="email"
				labelContent="Электронная почта"
				labelFor="email"
			/>
			<Input
				inputType="number"
				inputId="age"
				inputName="age"
				labelContent="Возраст"
				labelFor="age"
			/>
			<div className={"flex flex-col gap-y-[1rem] gap-x-[1rem] min-[500px]:flex-row"}>
				<Select
					selectName="life-style"
					selectId="life-style"
					labelContent="Образ жизни"
					labelFor="life-style"
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
