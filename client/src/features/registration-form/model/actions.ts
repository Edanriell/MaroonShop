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
