import { Link } from "react-router-dom";

import { getProductType } from "./model";

import styles from "./styles.module.scss";

type Props = {
	data: Array<import("shared/api").Product>;
	simplified?: boolean;
};

// TODO Think about potential decomposition
export const ProductCard = ({ data, simplified = false }: Props) => {
	if (simplified) {
		const items = data.map((item) => (
			// <swiper-slide>
				<article className="grid gird-rows-2-auto w-[22rem] m-auto">
					<picture className="col-start-1 col-end-2 row-start-1 row-end-3">
						<source
							media="(min-width:1366px)"
							srcSet={`http://localhost:4020${item.image.lg}`}
						/>
						<source
							media="(min-width:768px)"
							srcSet={`http://localhost:4020${item.image.md}`}
						/>
						<source
							media="(min-width:320px)"
							srcSet={`http://localhost:4020${item.image.sm}`}
						/>
						<img
							src={`http://localhost:4020${item.image.lg}`}
							alt={item.name}
							className="w-[100%] h-[29.7rem] object-cover"
						/>
					</picture>
					<div className="flex flex-col items-center col-start-1 col-end-2 row-start-2 row-end-3">
						<h3 className="font-medium font-raleway text-sm-16px-lh-23px text-blue-zodiac-950">
							{item.name}
						</h3>
						<p className="font-normal lowercase font-mPlus text-sm-13px text-manatee-500">
							{getProductType({
								mainType: item.type.main,
								secondaryType: item.type.secondary,
							})}
						</p>
						<Link
							className={
								styles.underline +
								" " +
								"font-normal font-mPlus text-sm-13px text-blue-zodiac-950 mb-[2rem]"
							}
							to={`/${item.id}`}
						>
							Подробнее
						</Link>
					</div>
				</article>
			// </swiper-slide>
		));
		return (
			<>
				{/* <swiper-slide>
					<article className="grid gird-rows-2-auto w-[22rem] m-auto">
						<picture className="col-start-1 col-end-2 row-start-1 row-end-3">
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
						<div className="flex flex-col items-center col-start-1 col-end-2 row-start-2 row-end-3">
							<h3 className="font-medium font-raleway text-sm-16px-lh-23px text-blue-zodiac-950">
								{data[0].name}
							</h3>
							<p className="font-normal lowercase font-mPlus text-sm-13px text-manatee-500">
								{getProductType({
									mainType: data[0].type.main,
									secondaryType: data[0].type.secondary,
								})}
							</p>
							<Link
								className={
									styles.underline +
									" " +
									"font-normal font-mPlus text-sm-13px text-blue-zodiac-950 mb-[2rem]"
								}
								to={`/${data[0].id}`}
							>
								Подробнее
							</Link>
						</div>
					</article>
				</swiper-slide> */}
				{items}
			</>
		);
	}
};
