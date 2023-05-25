export type FormState = {
	readonly nameInput: {
		value: null | string;
		validLength: boolean;
		validPattern: boolean;
	};
	readonly surnameInput: {
		value: null | string;
		validLength: boolean;
		validPattern: boolean;
	};
	readonly emailInput: {
		value: null | string;
		validLength: boolean;
		validPattern: boolean;
	};
	readonly ageInput: {
		value: null | string;
		validRange: boolean;
	};
	readonly lifeStyleSelect: {
		value: null | string;
		validOption: boolean;
	};
	readonly skinTypeSelect: {
		value: null | string;
		validOption: boolean;
	};
	readonly locationSelect: {
		value: null | string;
		validOption: boolean;
	};
};

export const CHANGEDNAME = "CHANGED_NAME";
export const updatingNameInputAction = (value: string) =>
	({
		type: CHANGEDNAME,
		value,
	} as const);

export const CHANGEDSURNAME = "CHANGED_SURNAME";
export const updatingSurnameInputAction = (value: string) =>
	({
		type: CHANGEDSURNAME,
		value,
	} as const);

export const CHANGEDEMAIL = "CHANGED_EMAIL";
export const updatingEmailInputAction = (value: string) =>
	({
		type: CHANGEDEMAIL,
		value,
	} as const);

export const CHANGEDAGE = "CHANGED_AGE";
export const updatingAgeInputAction = (value: string) =>
	({
		type: CHANGEDAGE,
		value,
	} as const);

export const SELECTEDLIFESTYLE = "SELECTED_LIFESTYLE";
export const updatingLifestyleSelectAction = (value: string) =>
	({
		type: SELECTEDLIFESTYLE,
		value,
	} as const);

export const SELECTEDSKINTYPE = "SELECTED_SKINTYPE";
export const updatingSkintypeSelectAction = (value: string) =>
	({
		type: SELECTEDSKINTYPE,
		value,
	} as const);

// selectingLocation
export const SELECTEDLOCATION = "SELECTED_LOCATION";
export const updatingLocationSelectAction = (value: string) =>
	({
		type: SELECTEDLOCATION,
		value,
	} as const);

export type FormActions =
	| ReturnType<typeof updatingNameInputAction>
	| ReturnType<typeof updatingSurnameInputAction>
	| ReturnType<typeof updatingEmailInputAction>
	| ReturnType<typeof updatingAgeInputAction>
	| ReturnType<typeof updatingLifestyleSelectAction>
	| ReturnType<typeof updatingSkintypeSelectAction>
	| ReturnType<typeof updatingLocationSelectAction>;
