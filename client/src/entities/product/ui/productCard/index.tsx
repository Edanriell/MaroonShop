import { Link } from "react-router-dom";

import { getProductType } from "./model";

type Props = {
	data: Array<import("shared/api").Product>;
	simplified?: boolean;
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
							secondaryType: data[0].type.secondary,
						})}
					</p>
					<Link to={`/${data[0].id}`}>Подробнее</Link>
				</div>
			</article>
		);
	}
};
