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

export const CHANGEDADDRESS = "CHANGED_ADDRESS";
export const changingAddressAction = (value: string) =>
	({
		type: CHANGEDADDRESS,
		value,
	} as const);

export const CHANGEDEMAIL = "CHANGED_EMAIL";
export const changingEmailAction = (value: string) =>
	({
		type: CHANGEDEMAIL,
		value,
	} as const);

export const CHANGEDPASSWORD = "CHANGED_PASSWORD";
export const changingPasswordAction = (value: string) =>
	({
		type: CHANGEDPASSWORD,
		value,
	} as const);
