import { GetProductTypeParameters, ProductType, IProductTypeMapper } from "./types";

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
}

export const getProductType = ({ mainType, secondaryType }: GetProductTypeParameters): string => {
	const productTypeMapper = new ProductTypeMapper();
	return productTypeMapper.identifyProductType({ mainType, secondaryType });
};
