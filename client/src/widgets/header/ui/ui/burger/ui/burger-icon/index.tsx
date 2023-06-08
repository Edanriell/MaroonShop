import { FC } from "react";

import { ReactComponent as Bar } from "./assets/bar.svg";

import { BurgerBars, BurgerIconProps } from "./types";

const BurgerIcon: FC<BurgerIconProps> = ({
	firstBurgerBarRef,
	secondBurgerBarRef,
	thirdBurgerBarRef,
	fourthBurgerBarRef,
}) => {
	const burgerBars: BurgerBars = [
		{
			Bar,
			classes:
				"w-[2.2rem] h-[0.2rem] text-blue-zodiac-950 " +
				"md:w-[2.4rem] md:h-[0.3rem] duration-500 ease-out",
			ref: firstBurgerBarRef,
			id: "firstBurgerBar",
		},
		{
			Bar,
			classes:
				"w-[2.2rem] h-[0.2rem] text-blue-zodiac-950 " +
				"md:w-[2.4rem] md:h-[0.3rem] duration-500 ease-out",
			ref: secondBurgerBarRef,
			id: "secondBurgerBar",
		},
		{
			Bar,
			classes:
				"w-[2.2rem] h-[0.2rem] text-blue-zodiac-950 " +
				"md:w-[2.4rem] md:h-[0.3rem] duration-500 ease-out",
			ref: thirdBurgerBarRef,
			id: "thirdBurgerBar",
		},
		{
			Bar,
			classes:
				"w-[2.2rem] h-[0.2rem] text-blue-zodiac-950 " +
				"absolute top-50 left-0 hidden duration-500 ease-out " +
				"md:w-[2.4rem] md:h-[0.3rem]",
			ref: fourthBurgerBarRef,
			id: "fourthBurgerBar",
		},
	];

	return (
		<>
			{burgerBars.map(({ Bar, classes, ref, id }) => (
				<Bar key={id} className={classes} ref={ref} />
			))}
		</>
	);
};

export default BurgerIcon;
