import {
	CHANGEDPRODUCTNAME,
	CHANGEDPRODUCTCOMPONENTS,
	CHANGEDPRODUCTDESCRIPTION,
	CHANGEDPRODUCTUSAGE,
	CHANGEDPRODUCTIMAGESMALL,
	CHANGEDPRODUCTIMAGEMEDIUM,
	CHANGEDPRODUCTIMAGELARGE,
	CHANGEDPRODUCTMAINTYPE,
	CHANGEDPRODUCTSECONDARYTYPE,
	CHANGEDPRODUCTSKINTYPE,
	CHANGEDPRODUCTPRICE,
	CHANGEDPRODUCTQUANTITY,
} from "./actions";

import { FormState, FormActions } from "./types";

import { checkInputLength, checkInputPattern, checkSelectOption } from "./index";

export const initialFormState: FormState = {
	productNameInput: {
		value: "",
		validLength: null,
		validPattern: null,
	},
	productComponentsInput: {
		value: "",
		validLength: null,
		validPattern: null,
	},
	productDescriptionInput: {
		value: "",
		validLength: null,
		validPattern: null,
	},
	productUsageInput: {
		value: "",
		validLength: null,
		validPattern: null,
	},
	productImageSmallInput: {
		value: "",
		validLength: null,
		validPattern: null,
	},
	productImageMediumInput: {
		value: "",
		validLength: null,
		validPattern: null,
	},
	productImageLargeInput: {
		value: "",
		validLength: null,
		validPattern: null,
	},
	mainTypeSelect: {
		value: "",
		validOption: null,
	},
	secondaryTypeSelect: {
		value: "",
		validOption: null,
	},
	skinTypeInput: {
		value: "",
		validLength: null,
		validPattern: null,
	},
	productPriceInput: {
		value: "",
		validLength: null,
		validPattern: null,
	},
	productQuantityInput: {
		value: "",
		validLength: null,
		validPattern: null,
	},
};

export const reducer = (state: FormState, action: FormActions) => {
	switch (action.type) {
		case CHANGEDPRODUCTNAME:
			return {
				...state,
				productNameInput: {
					value: action.value,
					validLength: checkInputLength(action.value, 4),
					validPattern: checkInputPattern(action.value, /^[a-zа-яё\s]+$/iu),
				},
			};
		case CHANGEDPRODUCTCOMPONENTS:
			return {
				...state,
				productComponentsInput: {
					value: action.value,
					validLength: checkInputLength(action.value, 16),
					validPattern: checkInputPattern(action.value, /^[a-zа-яё,\s.]+$/iu),
				},
			};
		case CHANGEDPRODUCTDESCRIPTION:
			return {
				...state,
				productDescriptionInput: {
					value: action.value,
					validLength: checkInputLength(action.value, 32),
					validPattern: checkInputPattern(action.value, /^[a-zа-яё,\s.]+$/iu),
				},
			};
		case CHANGEDPRODUCTUSAGE:
			return {
				...state,
				productUsageInput: {
					value: action.value,
					validLength: checkInputLength(action.value, 24),
					validPattern: checkInputPattern(action.value, /^[a-zа-яё,\s.]+$/iu),
				},
			};
		case CHANGEDPRODUCTIMAGESMALL:
			return {
				...state,
				productImageSmallInput: {
					value: action.value,
					validLength: checkInputLength(action.value, 8),
					validPattern: checkInputPattern(action.value, RegExp("^https?://")),
				},
			};
		case CHANGEDPRODUCTIMAGEMEDIUM:
			return {
				...state,
				productImageMediumInput: {
					value: action.value,
					validLength: checkInputLength(action.value, 8),
					validPattern: checkInputPattern(action.value, RegExp("^https?://")),
				},
			};
		case CHANGEDPRODUCTIMAGELARGE:
			return {
				...state,
				productImageLargeInput: {
					value: action.value,
					validLength: checkInputLength(action.value, 8),
					validPattern: checkInputPattern(action.value, RegExp("^https?://")),
				},
			};
		case CHANGEDPRODUCTMAINTYPE:
			return {
				...state,
				mainTypeSelect: {
					value: action.value,
					validOption: checkSelectOption(action.value),
				},
			};
		case CHANGEDPRODUCTSECONDARYTYPE:
			return {
				...state,
				secondaryTypeSelect: {
					value: action.value,
					validOption: checkSelectOption(action.value),
				},
			};
		case CHANGEDPRODUCTSKINTYPE:
			return {
				...state,
				skinTypeInput: {
					value: action.value,
					validLength: checkInputLength(action.value, 2),
					validPattern: checkInputPattern(
						action.value,
						RegExp(
							// eslint-disable-next-line max-len
							"^(Сухая кожа|Нормальная кожа|Жирная кожа|Комбинированная кожа)(,Сухая кожа|,Нормальная кожа|,Жирная кожа|,Комбинированная кожа)*$(,Сухая кожа|,Нормальная кожа|,Жирная кожа|,Комбинированная кожа)*$(,Сухая кожа|,Нормальная кожа|,Жирная кожа|,Комбинированная кожа)*$",
						),
					),
				},
			};
		case CHANGEDPRODUCTPRICE:
			return {
				...state,
				productPriceInput: {
					value: action.value,
					validLength: checkInputLength(action.value, 2),
					validPattern: checkInputPattern(action.value, RegExp("^[0-9]+(?:,[0-9]+)*$")),
				},
			};
		case CHANGEDPRODUCTQUANTITY:
			return {
				...state,
				productQuantityInput: {
					value: action.value,
					validLength: checkInputLength(action.value, 2),
					validPattern: checkInputPattern(
						action.value,
						RegExp("^[0-9]+(g|ml)(?:,[0-9]+(g|ml))*$"),
					),
				},
			};
		default:
			return state;
	}
};
