export const checkInputLength = (value: string, minLength: number): boolean =>
	value.length >= minLength;

export const checkInputPattern = (value: string, pattern: RegExp): boolean => pattern.test(value);

export const checkInputRange = (value: string, range: [number, number]): boolean =>
	Number(value) >= range[0] && Number(value) <= range[1];

export const checkSelectOption = (value: string): boolean => value !== "";
