import { FC } from "react";
import { Link } from "react-router-dom";

import { Card3d } from "shared/ui";

import { ReactComponent as Arrow } from "./assets/arrow.svg";

import { HeroCardProps } from "./types";

const HeroCard: FC<HeroCardProps> = ({ classes, images, link, label }) => {
	return (
		<Card3d className={classes}>
			<Link to={link}>
				<picture className={"mb-[0.6rem] md:mb-[0.9rem] block"}>
					<source media="(min-width:1366px)" srcSet={images.imgLg} />
					<source media="(min-width:768px)" srcSet={images.imgMd} />
					<source media="(min-width:320px)" srcSet={images.imgSm} />
					<img
						src={images.imgLg}
						alt={label}
						className={
							"w-[40.625vw] h-[53.125vw] md:w-[31.9010416vw] " +
							"md:h-[41.927083vw] lg:w-[33rem] lg:h-[42.2rem]"
						}
					/>
				</picture>
				<div className={"flex items-center justify-between"}>
					<span
						className={
							"font-medium text-blue-zodiac-950 font-mPlus " +
							"text-sm-12px-lh-17px md:text-md-16px-lh-22px"
						}
					>
						{label}
					</span>
					<Arrow
						className={
							"w-[2.3rem] h-[1rem] text-blue-zodiac-950 md:w-[2.6rem] " +
							"md:h-[1.2rem]"
						}
					/>
				</div>
			</Link>
		</Card3d>
	);
};

export default HeroCard;
