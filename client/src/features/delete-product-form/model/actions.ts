export const CHANGEDPRODUCTNAME = "CHANGED_PRODUCTNAME";
export const changingProductNameAction = (value: string) =>
	({
		type: CHANGEDPRODUCTNAME,
		value,
	} as const);

export const CHANGEDPRODUCTCOMPONENTS = "CHANGED_PRODUCTCOMPONENTS";
export const changingProductComponentsAction = (value: string) =>
	({
		type: CHANGEDPRODUCTCOMPONENTS,
		value,
	} as const);

export const CHANGEDPRODUCTDESCRIPTION = "CHANGED_PRODUCTDESCRIPTION";
export const changingProductsDescriptionAction = (value: string) =>
	({
		type: CHANGEDPRODUCTDESCRIPTION,
		value,
	} as const);

export const CHANGEDPRODUCTUSAGE = "CHANGED_PRODUCTUSAGE";
export const changingProductUsageAction = (value: string) =>
	({
		type: CHANGEDPRODUCTUSAGE,
		value,
	} as const);

export const CHANGEDPRODUCTIMAGESMALL = "CHANGED_PRODUCTIMAGESMALL";
export const changingProductImageSmallAction = (value: string) =>
	({
		type: CHANGEDPRODUCTIMAGESMALL,
		value,
	} as const);

export const CHANGEDPRODUCTIMAGEMEDIUM = "CHANGED_PRODUCTIMAGEMEDIUM";
export const changingProductImageMediumAction = (value: string) =>
	({
		type: CHANGEDPRODUCTIMAGEMEDIUM,
		value,
	} as const);

export const CHANGEDPRODUCTIMAGELARGE = "CHANGED_PRODUCTIMAGELARGE";
export const changingProductImageLargeAction = (value: string) =>
	({
		type: CHANGEDPRODUCTIMAGELARGE,
		value,
	} as const);

export const CHANGEDPRODUCTMAINTYPE = "CHANGED_PRODUCTMAINTYPE";
export const changingProductMainTypeAction = (value: string) =>
	({
		type: CHANGEDPRODUCTMAINTYPE,
		value,
	} as const);

export const CHANGEDPRODUCTSECONDARYTYPE = "CHANGED_PRODUCTSECONDARYTYPE";
export const changingProductSecondaryTypeAction = (value: string) =>
	({
		type: CHANGEDPRODUCTSECONDARYTYPE,
		value,
	} as const);

export const CHANGEDPRODUCTSKINTYPE = "CHANGED_PRODUCTSKINTYPE";
export const changingProductSkinTypeAction = (value: string) =>
	({
		type: CHANGEDPRODUCTSKINTYPE,
		value,
	} as const);

export const CHANGEDPRODUCTPRICE = "CHANGED_PRODUCTPRICE";
export const changingProductPriceAction = (value: string) =>
	({
		type: CHANGEDPRODUCTPRICE,
		value,
	} as const);

export const CHANGEDPRODUCTQUANTITY = "CHANGED_PRODUCTQUANTITY";
export const changingProductQuantityAction = (value: string) =>
	({
		type: CHANGEDPRODUCTQUANTITY,
		value,
	} as const);
