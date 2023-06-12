export type ProductType = {
	[key: string]: {
		[key: string]: string;
	};
};

export type GetProductTypeParameters = {
	mainType: string;
	secondaryType: string;
};

export interface IProductTypeMapper {
	identifyProductType({ mainType, secondaryType }: GetProductTypeParameters): string;
}
