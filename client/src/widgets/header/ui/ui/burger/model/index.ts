import { MutableRefObject, Dispatch, SetStateAction } from "react";
import { gsap } from "gsap";

import { BurgerTransformParameters } from "./types";

export const transformBurgerToCross = ({
	firstBurgerBarRef,
	secondBurgerBarRef,
	thirdBurgerBarRef,
	fourthBurgerBarRef,
	onBurgerTransition,
}: BurgerTransformParameters): void => {
	gsap.fromTo(
		firstBurgerBarRef.current,
		{ translateX: 0, opacity: 1 },
		{
			translateX: 25,
			opacity: 0,
			duration: 0.25,
			ease: "power2.out",
			onStart: () => {
				onBurgerTransition(true);
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
				onBurgerTransition(false);
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
};

export const transformCrossToBurger = ({
	firstBurgerBarRef,
	secondBurgerBarRef,
	thirdBurgerBarRef,
	fourthBurgerBarRef,
	onBurgerTransition,
}: BurgerTransformParameters): void => {
	gsap.fromTo(
		secondBurgerBarRef.current,
		{ translateY: 0, rotate: 45 },
		{
			translateY: 0,
			rotate: 0,
			duration: 0.25,
			ease: "power2.out",
			onStart: () => {
				onBurgerTransition(true);
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
				onBurgerTransition(false);
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
};

export const displayBurgerMenu = (burgerMenuRef: MutableRefObject<null>): void => {
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
};

export const hideBurgerMenu = (
	burgerMenuRef: MutableRefObject<null>,
	setIsDisplayed: Dispatch<SetStateAction<boolean>>,
): void => {
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
};
