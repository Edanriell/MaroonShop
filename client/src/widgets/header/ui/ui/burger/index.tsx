import { useState, useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";

import {
	transformBurgerToCross,
	transformCrossToBurger,
	displayBurgerMenu,
	hideBurgerMenu,
} from "./model";

import { BurgerMenu, BurgerIcon } from "./ui";

import { IsDisplayed, IsTransitioning } from "./types";

const Burger = () => {
	const burgerMenuRef = useRef<null>(null);
	const firstBurgerBarRef = useRef<null>(null);
	const secondBurgerBarRef = useRef<null>(null);
	const thirdBurgerBarRef = useRef<null>(null);
	const fourthBurgerBarRef = useRef<null>(null);

	const [isDisplayed, setIsDisplayed] = useState<IsDisplayed>(false);
	const [isTransitioning, setIsTransitioning] = useState<IsTransitioning>(false);
	const [burgerMenuCtx] = useState(gsap.context(() => {}, burgerMenuRef));

	useLayoutEffect(() => {
		if (burgerMenuRef.current) displayBurgerMenu(burgerMenuRef);

		burgerMenuCtx.add("hide", () => {
			hideBurgerMenu(burgerMenuRef, setIsDisplayed);
		});

		return () => burgerMenuCtx.revert();
	}, [isDisplayed, burgerMenuCtx]);

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
			burgerMenuCtx.hide();
			transformCrossToBurger({
				firstBurgerBarRef,
				secondBurgerBarRef,
				thirdBurgerBarRef,
				fourthBurgerBarRef,
				onBurgerTransition: setIsTransitioning,
			});
		}
	}

	return (
		<div>
			<button
				aria-label="burger menu"
				className={
					"flex flex-col items-center justify-center " +
					"cursor-pointer gap-y-[0.3rem] relative z-10 mr-[2.5rem] " +
					"md:mr-[4rem] md:gap-y-[0.4rem] " +
					"burger-hover-effect"
				}
				type="button"
				disabled={isTransitioning}
				onClick={handleBurgerClick}
			>
				<BurgerIcon
					firstBurgerBarRef={firstBurgerBarRef}
					secondBurgerBarRef={secondBurgerBarRef}
					thirdBurgerBarRef={thirdBurgerBarRef}
					fourthBurgerBarRef={fourthBurgerBarRef}
				/>
			</button>
			{isDisplayed && (
				<div
					ref={burgerMenuRef}
					className={
						"absolute top-0 left-0 w-full " +
						"bg-desert-storm-50 shadow-burgerMenu " +
						"box -z-10"
					}
				>
					<BurgerMenu />
				</div>
			)}
		</div>
	);
};

export default Burger;
