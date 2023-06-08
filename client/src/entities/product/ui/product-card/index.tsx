import { FC } from "react";
import { Link } from "react-router-dom";

import { getProductType } from "./model";

import { ProductCardProps } from "./types";

import styles from "./styles.module.scss";

// TODO Make normal card
export const ProductCard: FC<ProductCardProps> = ({ data, simplified = false }) => {
	if (simplified) {
		return (
			<article className={"grid gird-rows-2-auto w-[22rem] m-auto md:w-[23rem]"}>
				<picture className={"col-start-1 col-end-2 row-start-1 row-end-3"}>
					<source
						media="(min-width:1366px)"
						srcSet={`http://localhost:4020${data.image.lg}`}
					/>
					<source
						media="(min-width:768px)"
						srcSet={`http://localhost:4020${data.image.md}`}
					/>
					<source
						media="(min-width:320px)"
						srcSet={`http://localhost:4020${data.image.sm}`}
					/>
					<img
						src={`http://localhost:4020${data.image.lg}`}
						alt={data.name}
						className={"w-[100%] h-[29.7rem] object-cover md:h-[31.2rem]"}
					/>
				</picture>
				<div
					className={
						"flex flex-col items-center col-start-1 " +
						"col-end-2 row-start-2 row-end-3"
					}
				>
					<h3
						className={
							"font-medium font-raleway text-sm-16px-lh-23px " +
							"text-blue-zodiac-950"
						}
					>
						{data.name}
					</h3>
					<p className={"font-normal lowercase font-mPlus text-sm-13px text-manatee-500"}>
						{getProductType({
							mainType: data.type.main,
							secondaryType: data.type.secondary,
						})}
					</p>
					<Link
						className={
							styles.underline +
							" " +
							"font-normal font-mPlus text-sm-13px text-blue-zodiac-950 mt-[0.5rem] mb-[2rem] " +
							"hover:text-blue-zodiac-800 hover:after:bg-blue-zodiac-800 " +
							"duration-500 ease-out after:duration-500 after:ease-out md:mb-[2.5rem] md:mt-[1rem]"
						}
						to={`/${data.id}`}
					>
						Подробнее
					</Link>
				</div>
			</article>
		);
	}

	return <div></div>;
};
