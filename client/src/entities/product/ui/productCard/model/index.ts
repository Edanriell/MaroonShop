type getProductTypeProps = {
	mainType: string;
	secondaryType: string;
};

export const getProductType = ({ mainType, secondaryType }: getProductTypeProps) => {
	if (mainType === "face") {
		if (secondaryType === "cream") {
			return "крем для лица";
		} else if (secondaryType === "serum") {
			return "cыворотка для лица";
		} else if (secondaryType === "mask") {
			return "маска для лица";
		} else if (secondaryType === "foam") {
			return "пенка для лица";
		} else if (secondaryType === "tonic") {
			return "тоник для лица";
		} else if (secondaryType === "powder") {
			return "минеральная пудра";
		} else {
			return "продукт для лица";
		}
	} else if (mainType === "body") {
		if (secondaryType === "cream") {
			return "крем для тела";
		} else if (secondaryType === "oil") {
			return "масло для тела";
		} else if (secondaryType === "scrub") {
			return "скраб для тела";
		} else if (secondaryType === "soap") {
			return "мыло ручной работы";
		} else if (secondaryType === "bath bomb") {
			return "бомбочка для ванны";
		} else if (secondaryType === "bath salt") {
			return "соль для ванны";
		} else {
			return "продукт для тела";
		}
	} else {
		return "неизвестный тип продукта";
	}
};
