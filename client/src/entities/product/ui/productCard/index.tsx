import { Link } from "react-router-dom";

type Props = {
	data: Array<import("shared/api").Product>;
	simplified?: boolean;
};

type getProductTypeProps = {
	mainType: string;
	secondaryType: string;
};

const getProductType = ({ mainType, secondaryType }: getProductTypeProps) => {
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

export const ProductCard = ({ data, simplified = false }: Props) => {
	if (simplified) {
		return (
			<article className="grid">
				<picture className="">
					<source
						media="(min-width:1366px)"
						srcSet={`http://localhost:4020${data[0].image.lg}`}
					/>
					<source
						media="(min-width:768px)"
						srcSet={`http://localhost:4020${data[0].image.md}`}
					/>
					<source
						media="(min-width:320px)"
						srcSet={`http://localhost:4020${data[0].image.sm}`}
					/>
					<img
						src={`http://localhost:4020${data[0].image.lg}`}
						alt={data[0].name}
						className=""
					/>
				</picture>
				<div>
					<h3>{data[0].name}</h3>
					<p>
						{getProductType({
							mainType: data[0].type.main,
							secondaryType: data[0].type.secondary.toString(),
						})}
					</p>
					<Link to={`/${data[0].id}`}>Подробнее</Link>
				</div>
			</article>
		);
	}
};
