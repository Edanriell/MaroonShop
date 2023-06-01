import { FormState } from "./types";

export const checkInputLength = (value: string, minLength: number): boolean =>
	value.length >= minLength;

export const checkInputPattern = (value: string, pattern: RegExp): boolean => pattern.test(value);

export const checkInputRange = (value: string, range: [number, number]): boolean =>
	Number(value) >= range[0] && Number(value) <= range[1];

export const checkSelectOption = (value: string): boolean => value !== "";

export const isFormValid = (formState: FormState): boolean =>
	Boolean(formState.nameInput.validLength) &&
	Boolean(formState.nameInput.validPattern) &&
	Boolean(formState.surnameInput.validLength) &&
	Boolean(formState.surnameInput.validPattern) &&
	Boolean(formState.emailInput.validLength) &&
	Boolean(formState.emailInput.validPattern) &&
	Boolean(formState.ageInput.validRange) &&
	Boolean(formState.lifeStyleSelect.validOption) &&
	Boolean(formState.skinTypeSelect.validOption) &&
	Boolean(formState.locationSelect.validOption);
