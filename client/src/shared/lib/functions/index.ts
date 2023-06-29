import {
	GetProductTypeParameters,
	AddProductTypeParameters,
	ProductType,
	IProductTypeMapper,
} from "./types";

class ProductTypeMapper implements IProductTypeMapper {
	private productTypes: ProductType = {
		face: {
			"face-cream": "крем для лица",
			"face-serum": "cыворотка для лица",
			"face-mask": "маска для лица",
			"face-foam": "пенка для лица",
			"face-tonic": "тоник для лица",
			"face-powder": "минеральная пудра",
		},
		body: {
			"body-cream": "крем для тела",
			"body-oil": "масло для тела",
			"body-scrub": "скраб для тела",
			"body-soap": "мыло ручной работы",
			"body-bath-bomb": "бомбочка для ванны",
			"body-bath-salt": "соль для ванны",
		},
	};

	public identifyProductType({ mainType, secondaryType }: GetProductTypeParameters): string {
		if (mainType in this.productTypes && secondaryType in this.productTypes[mainType]) {
			return this.productTypes[mainType][secondaryType];
		}

		return "неизвестный тип продукта";
	}

	public addProductType({
		mainType,
		secondaryTypes,
		secondaryTypesMeanings,
	}: AddProductTypeParameters) {
		if (mainType in this.productTypes) return;
		if (secondaryTypes.length !== secondaryTypesMeanings.length) return;

		this.productTypes[mainType] = {};
		for (const [i, secondaryType] of Object.entries(secondaryTypes)) {
			this.productTypes[mainType][secondaryType] = secondaryTypesMeanings[+i];
		}
	}

	get getProductTypes(): ProductType {
		return this.productTypes;
	}
}

export const getProductType = ({ mainType, secondaryType }: GetProductTypeParameters): string => {
	const productTypeMapper = new ProductTypeMapper();
	return productTypeMapper.identifyProductType({ mainType, secondaryType });
};
