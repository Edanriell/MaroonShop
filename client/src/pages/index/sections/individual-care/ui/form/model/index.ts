import {
	FormState,
	FormActions,
	CHANGEDNAME,
	CHANGEDSURNAME,
	CHANGEDEMAIL,
	CHANGEDAGE,
	SELECTEDLIFESTYLE,
	SELECTEDSKINTYPE,
	SELECTEDLOCATION,
} from "./types";

export const initialFormState: FormState = {
	form: {
		inputs: {
			nameInput: {
				value: null,
				validLength: false,
				validPattern: false,
			},
			surnameInput: {
				value: null,
				validLength: false,
				validPattern: false,
			},
			emailInput: {
				value: null,
				validLength: false,
				validPattern: false,
			},
			ageInput: {
				value: null,
				validRange: false,
			},
		},
		selects: {
			lifeStyleSelect: {
				value: null,
				validOption: false,
			},
			skinTypeSelect: {
				value: null,
				validOption: false,
			},
			locationSelect: {
				value: null,
				validOption: false,
			},
		},
	},
};

const checkInputLength = (value: string, minLength: number): boolean => value.length >= minLength;

const checkInputPattern = (value: string, pattern: RegExp): boolean => pattern.test(value);

const checkInputRange = (value: string, range: [number, number]): boolean =>
	Number(value) >= range[0] && Number(value) <= range[1];

const checkSelectOption = (value: string): boolean => value !== " ";

export const reducer = (state: FormState, action: FormActions) => {
	switch (action.type) {
		case CHANGEDNAME:
			return {
				...state,

				inputs: {
					nameInput: {
						value: action.value,
						validLength: checkInputLength(action.value, 3),
						validPattern: checkInputPattern(action.value, /^[a-zа-яё\s]+$/iu),
					},
				},
			};
		case CHANGEDSURNAME:
			return {
				...state,
				inputs: {
					surnameInput: {
						value: action.value,
						validLength: checkInputLength(action.value, 3),
						validPattern: checkInputPattern(action.value, /^[a-zа-яё\s]+$/iu),
					},
				},
			};
		case CHANGEDEMAIL:
			return {
				...state,
				inputs: {
					emailInput: {
						value: action.value,
						validLength: checkInputLength(action.value, 8),
						validPattern: checkInputPattern(
							action.value,
							// eslint-disable-next-line max-len
							/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
						),
					},
				},
			};
		case CHANGEDAGE:
			return {
				...state,
				inputs: {
					ageInput: {
						value: action.value,
						validRange: checkInputRange(action.value, [4, 120]),
					},
				},
			};
		case SELECTEDLIFESTYLE:
			return {
				...state,
				selects: {
					lifeStyleSelect: {
						value: action.value,
						validOption: checkSelectOption(action.value),
					},
				},
			};
		case SELECTEDSKINTYPE:
			return {
				...state,
				selects: {
					skinTypeSelect: {
						value: action.value,
						validOption: checkSelectOption(action.value),
					},
				},
			};
		case SELECTEDLOCATION:
			return {
				...state,
				selects: {
					locationSelect: {
						value: action.value,
						validOption: checkSelectOption(action.value),
					},
				},
			};
		default:
			return state;
	}
};
