import {
	changingProductNameAction,
	changingProductComponentsAction,
	changingProductsDescriptionAction,
	changingProductUsageAction,
	changingProductImageSmallAction,
	changingProductImageMediumAction,
	changingProductImageLargeAction,
	changingProductMainTypeAction,
	changingProductSecondaryTypeAction,
	changingProductSkinTypeAction,
	changingProductPriceAction,
	changingProductQuantityAction,
} from "./actions";

export type FormInput = {
	value: "" | string;
	validLength: null | boolean;
	validPattern: null | boolean;
};

export type FormSelect = {
	value: "" | string;
	validOption: null | boolean;
};

export type FormState = {
	productNameInput: FormInput;
	productComponentsInput: FormInput;
	productDescriptionInput: FormInput;
	productUsageInput: FormInput;
	productImageSmallInput: FormInput;
	productImageMediumInput: FormInput;
	productImageLargeInput: FormInput;
	mainTypeSelect: FormSelect;
	secondaryTypeSelect: FormSelect;
	skinTypeSelect: FormSelect;
	productPriceInput: FormInput;
	productQuantityInput: FormInput;
};

export type FormActions =
	| ReturnType<typeof changingProductNameAction>
	| ReturnType<typeof changingProductComponentsAction>
	| ReturnType<typeof changingProductsDescriptionAction>
	| ReturnType<typeof changingProductUsageAction>
	| ReturnType<typeof changingProductImageSmallAction>
	| ReturnType<typeof changingProductImageMediumAction>
	| ReturnType<typeof changingProductImageLargeAction>
	| ReturnType<typeof changingProductMainTypeAction>
	| ReturnType<typeof changingProductSecondaryTypeAction>
	| ReturnType<typeof changingProductSkinTypeAction>
	| ReturnType<typeof changingProductPriceAction>
	| ReturnType<typeof changingProductQuantityAction>;
