import { FormState, FormInput, FormSelect } from "./types";

export const checkInputLength = (value: string, minLength: number): boolean =>
	value.length >= minLength;

export const checkInputPattern = (value: string, pattern: RegExp): boolean => pattern.test(value);

export const checkSelectOption = (value: string): boolean => value !== "";

const isInputValid = (input: FormInput): boolean =>
	Boolean(input.validLength) && Boolean(input.validPattern);

const isSelectValid = (select: FormSelect): boolean => Boolean(select.validOption);

export const isFormValid = (formState: FormState): boolean => {
	const {
		productNameInput,
		productComponentsInput,
		productDescriptionInput,
		productUsageInput,
		productImageSmallInput,
		productImageMediumInput,
		productImageLargeInput,
		mainTypeSelect,
		secondaryTypeSelect,
		skinTypeSelect,
		productPriceInput,
		productQuantityInput,
	} = formState;

	return (
		isInputValid(productNameInput) &&
		isInputValid(productComponentsInput) &&
		isInputValid(productDescriptionInput) &&
		isInputValid(productUsageInput) &&
		isInputValid(productImageSmallInput) &&
		isInputValid(productImageMediumInput) &&
		isInputValid(productImageLargeInput) &&
		isSelectValid(mainTypeSelect) &&
		isSelectValid(secondaryTypeSelect) &&
		isSelectValid(skinTypeSelect) &&
		isInputValid(productPriceInput) &&
		isInputValid(productQuantityInput)
	);
};
