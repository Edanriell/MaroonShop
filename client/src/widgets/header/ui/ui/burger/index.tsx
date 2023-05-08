import { useState, useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";

import {
	transformBurgerToCross,
	transformCrossToBurger,
	displayBurgerMenu,
	hideBurgerMenu,
} from "./model";

import { BurgerMenu, BurgerIcon } from "./ui";

type IsDisplayed = boolean;
type IsTransitioning = boolean;

const Burger = () => {
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
			displayBurgerMenu(burgerMenuRef);
		}

		burgerMenuCtx.add("remove", () => {
			hideBurgerMenu(burgerMenuRef, setIsDisplayed);
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

	return (
		<div>
			<button
				aria-label="burger menu"
				className={`
					flex flex-col items-center justify-center 
					cursor-pointer gap-y-[0.3rem] md:gap-y-[0.4rem] relative z-10
					burger-hover-effect
				`}
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
					className="absolute top-0 left-0 w-full bg-desert-storm-50 shadow-burgerMenu box -z-10"
				>
					<BurgerMenu />
				</div>
			)}
		</div>
	);
};

export default Burger;
