import { useState, useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";

import BurgerMenu from "./ui/burgerMenu";

import { ReactComponent as Bar } from "./assets/bar.svg";

type IsDisplayed = boolean;

function Burger() {
	const burgerMenuRef = useRef(null);
	const firstBurgerBarRef = useRef(null);
	const secondBurgerBarRef = useRef(null);
	const thirdBurgerBarRef = useRef(null);

	const [isDisplayed, setIsDisplayed] = useState<IsDisplayed>(false);
	const [burgerMenuCtx] = useState(gsap.context(() => {}, burgerMenuRef));

	useLayoutEffect(() => {
		if (burgerMenuRef.current) {
			gsap.fromTo(
				burgerMenuRef.current,
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

		burgerMenuCtx.add("remove", () => {
			gsap.fromTo(
				burgerMenuRef.current,
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
		return () => burgerMenuCtx.revert();
	}, [isDisplayed]);

	// TODO PUT TO MODEL ?
	function transformBurger() {
		gsap.fromTo(
			firstBurgerBarRef.current,
			{ opacity: 1 },
			{
				opacity: 0,
				duration: 0.25,
				ease: "power2.out",
			},
		);
	}

	function handleDisplayClick() {
		if (!isDisplayed) {
			setIsDisplayed(true);
			transformBurger();
		} else {
			burgerMenuCtx.remove();
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
				<Bar
					ref={firstBurgerBarRef}
					className="dras w-[2.2rem] h-[0.2rem] text-blue-zodiac md:w-[2.4rem] md:h-[0.3rem]"
				/>
				<Bar
					ref={secondBurgerBarRef}
					className="w-[2.2rem] h-[0.2rem] text-blue-zodiac md:w-[2.4rem] md:h-[0.3rem]"
				/>
				<Bar
					ref={thirdBurgerBarRef}
					className="w-[2.2rem] h-[0.2rem] text-blue-zodiac md:w-[2.4rem] md:h-[0.3rem]"
				/>
			</div>
			{isDisplayed && (
				<div
					ref={burgerMenuRef}
					className="absolute top-0 left-0 w-full bg-desert-storm shadow-burgerMenu box"
				>
					<BurgerMenu />
				</div>
			)}
		</div>
	);
}

export default Burger;
