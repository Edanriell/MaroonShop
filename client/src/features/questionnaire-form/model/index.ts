import { FormState, FormInput, FormAgeInput, FormSelect } from "./types";

export const checkInputLength = (value: string, minLength: number): boolean =>
	value.length >= minLength;

export const checkInputPattern = (value: string, pattern: RegExp): boolean => pattern.test(value);

export const checkInputRange = (value: string, range: [number, number]): boolean =>
	Number(value) >= range[0] && Number(value) <= range[1];

export const checkSelectOption = (value: string): boolean => value !== "";

const isInputValid = (input: FormInput): boolean =>
	Boolean(input.validLength) && Boolean(input.validPattern);

const isRangeInputValid = (input: FormAgeInput): boolean => Boolean(input.validRange);

const isSelectValid = (select: FormSelect): boolean => Boolean(select.validOption);

export const isFormValid = (formState: FormState): boolean => {
	const {
		nameInput,
		surnameInput,
		emailInput,
		ageInput,
		lifeStyleSelect,
		skinTypeSelect,
		locationSelect,
	} = formState;

	return (
		isInputValid(nameInput) &&
		isInputValid(surnameInput) &&
		isInputValid(emailInput) &&
		isRangeInputValid(ageInput) &&
		isSelectValid(lifeStyleSelect) &&
		isSelectValid(skinTypeSelect) &&
		isSelectValid(locationSelect)
	);
};
