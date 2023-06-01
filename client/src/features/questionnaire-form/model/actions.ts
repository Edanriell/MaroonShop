export const CHANGEDNAME = "CHANGED_NAME";
export const changingNameAction = (value: string) =>
	({
		type: CHANGEDNAME,
		value,
	} as const);

export const CHANGEDSURNAME = "CHANGED_SURNAME";
export const changingSurnameAction = (value: string) =>
	({
		type: CHANGEDSURNAME,
		value,
	} as const);

export const CHANGEDEMAIL = "CHANGED_EMAIL";
export const changingEmailAction = (value: string) =>
	({
		type: CHANGEDEMAIL,
		value,
	} as const);

export const CHANGEDAGE = "CHANGED_AGE";
export const changingAgeAction = (value: string) =>
	({
		type: CHANGEDAGE,
		value,
	} as const);

export const SELECTEDLIFESTYLE = "SELECTED_LIFESTYLE";
export const selectingLifestyleAction = (value: string) =>
	({
		type: SELECTEDLIFESTYLE,
		value,
	} as const);

export const SELECTEDSKINTYPE = "SELECTED_SKINTYPE";
export const selectingSkintypeAction = (value: string) =>
	({
		type: SELECTEDSKINTYPE,
		value,
	} as const);

export const SELECTEDLOCATION = "SELECTED_LOCATION";
export const selectingLocationAction = (value: string) =>
	({
		type: SELECTEDLOCATION,
		value,
	} as const);
