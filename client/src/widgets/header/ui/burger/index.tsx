import { useState, useRef, useLayoutEffect } from "react";

import { gsap } from "gsap";

import {
	transformBurgerToCross,
	transformCrossToBurger,
	displayBurgerMenuContent,
	hideBurgerMenuContent,
} from "./model";

import BurgerMenu from "./ui/burgerMenu";

import { ReactComponent as Bar } from "./assets/bar.svg";

type IsDisplayed = boolean;
type IsTransitioning = boolean;

function Burger() {
	const burgerMenuRef = useRef(null);
	const firstBurgerBarRef = useRef(null);
	const secondBurgerBarRef = useRef(null);
	const thirdBurgerBarRef = useRef(null);
	const fourthBurgerBarRef = useRef(null);

	const [isDisplayed, setIsDisplayed] = useState<IsDisplayed>(false);
	const [isTransitioning, setIsTransitioning] = useState<IsTransitioning>(false);
	const [burgerMenuCtx] = useState(gsap.context(() => {}, burgerMenuRef));

	useLayoutEffect(() => {
		if (burgerMenuRef.current) {
			displayBurgerMenuContent(burgerMenuRef);
		}

		burgerMenuCtx.add("remove", () => {
			hideBurgerMenuContent(burgerMenuRef, setIsDisplayed);
		});

		return () => burgerMenuCtx.revert();
	}, [isDisplayed]);

	function handleBurgerClick() {
		if (!isDisplayed) {
			setIsDisplayed(true);
			transformBurgerToCross({
				firstBurgerBarRef,
				secondBurgerBarRef,
				thirdBurgerBarRef,
				fourthBurgerBarRef,
				onBurgerTransition: setIsTransitioning,
			});
		} else {
			burgerMenuCtx.remove();
			transformCrossToBurger({
				firstBurgerBarRef,
				secondBurgerBarRef,
				thirdBurgerBarRef,
				fourthBurgerBarRef,
				onBurgerTransition: setIsTransitioning,
			});
		}
	}

	const burgerBars = [
		{
			Bar,
			classes: "dras w-[2.2rem] h-[0.2rem] text-blue-zodiac md:w-[2.4rem] md:h-[0.3rem]",
			ref: firstBurgerBarRef,
			key: "firstBurgerBar",
		},
		{
			Bar,
			classes: "w-[2.2rem] h-[0.2rem] text-blue-zodiac md:w-[2.4rem] md:h-[0.3rem]",
			ref: secondBurgerBarRef,
			key: "secondBurgerBar",
		},
		{
			Bar,
			classes: "w-[2.2rem] h-[0.2rem] text-blue-zodiac md:w-[2.4rem] md:h-[0.3rem]",
			ref: thirdBurgerBarRef,
			key: "thirdBurgerBar",
		},
		{
			Bar,
			classes:
				"w-[2.2rem] h-[0.2rem] text-blue-zodiac md:w-[2.4rem] md:h-[0.3rem] absolute top-50 left-0 hidden",
			ref: fourthBurgerBarRef,
			key: "fourthBurgerBar",
		},
	];

	return (
		<div>
			<button
				aria-label="burger menu"
				className={`
					flex flex-col items-center justify-center 
					cursor-pointer gap-y-[0.3rem] md:gap-y-[0.4rem] relative z-10 
					hover:opacity-50 duration-500 ease-out
				`}
				type="button"
				disabled={isTransitioning}
				onClick={handleBurgerClick}
			>
				{burgerBars.map(({ Bar, classes, ref, key }) => (
					<Bar key={key} className={classes} ref={ref} />
				))}
			</button>
			{isDisplayed && (
				<div
					ref={burgerMenuRef}
					className="absolute top-0 left-0 w-full bg-desert-storm shadow-burgerMenu box -z-10"
				>
					<BurgerMenu />
				</div>
			)}
		</div>
	);
}

export default Burger;
