export const CHANGEDPRODUCTNAME = "CHANGED_PRODUCTNAME";
export const changingProductNameAction = (value: string) =>
	({
		type: CHANGEDPRODUCTNAME,
		value,
	} as const);
