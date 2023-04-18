import { MutableRefObject, Dispatch, SetStateAction } from "react";

import { gsap } from "gsap";

// TODO PROPS TO FUNC CHECK
type transformBurgerParameters = {
	firstBurgerBarRef: MutableRefObject<null>;
	secondBurgerBarRef: MutableRefObject<null>;
	thirdBurgerBarRef: MutableRefObject<null>;
	fourthBurgerBarRef: MutableRefObject<null>;
	transformationType: TransformationType;
	onTransition: Dispatch<SetStateAction<boolean>>;
};

export type TransformationType = "Cross" | "Burger";

export const transformBurger = ({
	firstBurgerBarRef,
	secondBurgerBarRef,
	thirdBurgerBarRef,
	fourthBurgerBarRef,
	transformationType,
	onTransition,
}: transformBurgerParameters) => {
	switch (true) {
		case transformationType === "Cross":
			gsap.fromTo(
				firstBurgerBarRef.current,
				{ translateX: 0, opacity: 1 },
				{
					translateX: 25,
					opacity: 0,
					duration: 0.25,
					ease: "power2.out",
					onStart: () => {
						onTransition(true);
					},
				},
			);
			gsap.fromTo(
				thirdBurgerBarRef.current,
				{ translateX: 0, opacity: 1 },
				{
					translateX: -25,
					opacity: 0,
					duration: 0.25,
					ease: "power2.out",
				},
			);
			gsap.fromTo(
				secondBurgerBarRef.current,
				{ translateY: 0, rotate: 0 },
				{
					delay: 0.25,
					translateY: 0,
					rotate: 45,
					duration: 0.25,
					ease: "power2.out",
					onComplete: () => {
						onTransition(false);
					},
				},
			);
			gsap.fromTo(
				fourthBurgerBarRef.current,
				{ rotate: 0, display: "none" },
				{
					display: "block",
					delay: 0.25,
					rotate: -45,
					duration: 0.25,
					ease: "power2.out",
				},
			);
			break;
		case transformationType === "Burger":
			gsap.fromTo(
				secondBurgerBarRef.current,
				{ translateY: 0, rotate: 45 },
				{
					translateY: 0,
					rotate: 0,
					duration: 0.25,
					ease: "power2.out",
					onStart: () => {
						onTransition(true);
					},
				},
			);
			gsap.fromTo(
				fourthBurgerBarRef.current,
				{ rotate: -45, display: "block" },
				{
					display: "none",
					rotate: 0,
					duration: 0.25,
					ease: "power2.out",
				},
			);
			gsap.fromTo(
				firstBurgerBarRef.current,
				{ translateX: 25, opacity: 0 },
				{
					delay: 0.25,
					translateX: 0,
					opacity: 1,
					duration: 0.25,
					ease: "power2.out",
					onComplete: () => {
						onTransition(false);
					},
				},
			);
			gsap.fromTo(
				thirdBurgerBarRef.current,
				{ translateX: -25, opacity: 0 },
				{
					delay: 0.25,
					translateX: 0,
					opacity: 1,
					duration: 0.25,
					ease: "power2.out",
				},
			);
			break;
		default:
			break;
	}
};
