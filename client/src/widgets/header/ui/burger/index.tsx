import { useState, useRef, useLayoutEffect } from "react";
// Importing useState hook. Importing necessary types for SocialLinks type.

import { gsap } from "gsap";
// Importing animation library.

import BurgerMenu from "../burgerMenu";
// Importing BurgerMenu component;

import { ReactComponent as Bar } from "./assets/bar.svg";
//Importing Bar svg.

type IsDisplayed = boolean;
// Type for our isDisplayed state.

function Burger() {
	const [isDisplayed, setIsDisplayed] = useState<IsDisplayed>(false);

	const animation = useRef(null);

	const [ctx] = useState(gsap.context(() => {}, animation));

	useLayoutEffect(() => {
		if (animation.current) {
			gsap.fromTo(
				animation.current,
				{
					opacity: 0,
					translateY: -80,
				},
				{
					opacity: 1,
					translateY: 0,
					duration: 0.5,
					ease: "power2.out",
				},
			);
		}

		ctx.add("remove", () => {
			gsap.fromTo(
				animation.current,
				{ opacity: 1, translateY: 0 },
				{
					opacity: 0,
					translateY: -80,
					duration: 0.25,
					ease: "power2.out",
					onComplete: () => {
						setIsDisplayed(false);
					},
				},
			);
		});

		return () => ctx.revert();
	}, [isDisplayed]);

	function handleDisplayClick() {
		if (!isDisplayed) {
			setIsDisplayed(true);
		} else {
			ctx.remove();
		}
	}

	return (
		<div>
			<div
				aria-label="burger menu"
				className={`
					flex flex-col items-center justify-center 
					cursor-pointer gap-y-[0.3rem] md:gap-y-[0.4rem] relative z-10
				`}
				onClick={handleDisplayClick}
			>
				<Bar className="w-[2.2rem] h-[0.2rem] text-blue-zodiac md:w-[2.4rem] md:h-[0.3rem]" />
				<Bar className="w-[2.2rem] h-[0.2rem] text-blue-zodiac md:w-[2.4rem] md:h-[0.3rem]" />
				<Bar className="w-[2.2rem] h-[0.2rem] text-blue-zodiac md:w-[2.4rem] md:h-[0.3rem]" />
			</div>
			{isDisplayed && (
				<div
					ref={animation}
					className="absolute top-0 left-0 w-full bg-desert-storm shadow-burgerMenu box"
				>
					<BurgerMenu />
				</div>
			)}
		</div>
	);
}

export default Burger;
