export type ProductType = {
	[key: string]: {
		[key: string]: string;
	};
};

export type GetProductTypeParameters = {
	mainType: string;
	secondaryType: string;
};

export type AddProductTypeParameters = {
	mainType: string;
	secondaryTypes: Array<string>;
	secondaryTypesMeanings: Array<string>;
};

export interface IProductTypeMapper {
	identifyProductType({ mainType, secondaryType }: GetProductTypeParameters): string;
	addProductType({
		mainType,
		secondaryTypes,
		secondaryTypesMeanings,
	}: AddProductTypeParameters): void;
	get getProductTypes(): ProductType;
}
