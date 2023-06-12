import { GetProductTypeParameters, ProductType, IProductTypeMapper } from "./types";

class ProductTypeMapper implements IProductTypeMapper {
	private productTypes: ProductType = {
		face: {
			cream: "крем для лица",
			serum: "cыворотка для лица",
			mask: "маска для лица",
			foam: "пенка для лица",
			tonic: "тоник для лица",
			powder: "минеральная пудра",
		},
		body: {
			cream: "крем для тела",
			oil: "масло для тела",
			scrub: "скраб для тела",
			soap: "мыло ручной работы",
			bathBomb: "бомбочка для ванны",
			bathSalt: "соль для ванны",
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
