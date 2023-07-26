import { FC } from "react";
import { Link } from "react-router-dom";

import { getProductType } from "shared/lib/functions";

import { ProductCardProps } from "./types";

import { ReactComponent as RubleIcon } from "./assets/ruble.svg";

import styles from "./styles.module.scss";

export const ProductCard: FC<ProductCardProps> = ({
	data,
	cardType,
	className = "",
	backgroundImageClassName = "",
}) => {
	if (cardType === "basic") {
		return (
			<article className={"grid gird-rows-2-auto w-[22rem] m-auto md:w-[23rem] " + className}>
				<picture className={"col-start-1 col-end-2 row-start-1 row-end-3"}>
					<source media="(min-width:1366px)" srcSet={data.image.lg} />
					<source media="(min-width:768px)" srcSet={data.image.md} />
					<source media="(min-width:320px)" srcSet={data.image.sm} />
					<img
						src={data.image.lg}
						alt={data.name}
						className={
							"w-[100%] h-[29.7rem] object-cover md:h-[31.2rem] " +
							backgroundImageClassName
						}
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
							mainType: data.category.main,
							secondaryType: data.category.secondary,
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

	return (
		<article
			className={
				"relative w-full h-[90.625vw] pl-[2rem] " +
				"pr-[2rem] pt-[1.5rem] pb-[1.5rem] md:h-[45.57291666666667vw] " +
				"lg:w-[27rem] lg:h-[35rem] " +
				className
			}
		>
			<picture>
				<source media="(min-width:1366px)" srcSet={data.image.lg} />
				<source media="(min-width:768px)" srcSet={data.image.md} />
				<source media="(min-width:320px)" srcSet={data.image.sm} />
				<img
					src={data.image.lg}
					alt={data.name}
					className={
						"absolute w-full h-[90.625vw] top-0 left-0 object-cover " +
						"md:h-[45.57291666666667vw] lg:w-[27rem] lg:h-[35rem] " +
						backgroundImageClassName
					}
				/>
			</picture>
			<div className={"relative z-10 flex flex-col justify-end h-full"}>
				<div className={"flex flex-row items-center justify-between"}>
					<h3
						className={
							"font-medium font-raleway text-sm-16px-lh-23px text-blue-zodiac-950"
						}
					>
						{data.name}
					</h3>
					<strong
						className={
							"flex flex-row items-center font-medium font-mPlus " +
							"text-sm-12px text-blue-zodiac-950 md:text-md-13px"
						}
					>
						<span>{data.price[0]}</span>
						<RubleIcon
							className={"w-[0.7rem] h-[0.9rem] text-blue-zodiac-950 ml-[0.3rem]"}
						/>
					</strong>
				</div>
				<div className={"flex flex-row items-center justify-between"}>
					<p
						className={
							"font-normal font-mPlus text-sm-13px text-manatee-500 md:text-md-13px"
						}
					>
						{getProductType({
							mainType: data.category.main,
							secondaryType: data.category.secondary,
						})}
					</p>
					<span
						className={
							"font-normal font-mPlus text-sm-13px text-manatee-500 md:text-md-13px"
						}
					>
						{data.quantity[0]}
					</span>
				</div>
			</div>
		</article>
	);
};
