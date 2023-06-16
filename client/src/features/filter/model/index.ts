import { MutableRefObject } from "react";

import { gsap } from "gsap";

export const displayFilter = (filterRef: MutableRefObject<HTMLFormElement | null>): void => {
	gsap.fromTo(
		filterRef.current,
		{
			opacity: 0,
			translateY: -30,
		},
		{
			opacity: 1,
			translateY: 0,
			duration: 0.5,
			ease: "power2.out",
		},
	);
};

export const hideFilter = (
	filterRef: MutableRefObject<HTMLFormElement | null>,
	closeFilter: () => void,
): void => {
	gsap.fromTo(
		filterRef.current,
		{
			opacity: 1,
			translateY: 0,
		},
		{
			opacity: 0,
			translateY: -30,
			duration: 0.25,
			ease: "power2.out",
			onComplete: () => {
				closeFilter();
			},
		},
	);
};

export const displayOpenFilterButton = (
	openFilterButtonRef: MutableRefObject<HTMLDivElement | null>,
): void => {
	gsap.fromTo(
		openFilterButtonRef.current,
		{
			opacity: 0,
			scale: 0.6,
		},
		{
			opacity: 1,
			scale: 1,
			duration: 0.5,
			ease: "power2.out",
		},
	);
};

export const hideOpenFilterButton = (
	openFilterButtonRef: MutableRefObject<HTMLDivElement | null>,
	showFilter: () => void,
): void => {
	gsap.fromTo(
		openFilterButtonRef.current,
		{
			opacity: 1,
			scale: 1,
		},
		{
			opacity: 0,
			scale: 0.6,
			duration: 0.25,
			ease: "power2.out",
			onComplete: () => showFilter(),
		},
	);
};

export const displayCloseFilterButton = (
	closeFilterButtonRef: MutableRefObject<HTMLDivElement | null>,
): void => {
	gsap.fromTo(
		closeFilterButtonRef.current,
		{
			opacity: 0,
			scale: 0.6,
		},
		{
			opacity: 1,
			scale: 1,
			duration: 0.5,
			ease: "power2.out",
		},
	);
};

export const hideCloseFilterButton = (
	closeFilterButtonRef: MutableRefObject<HTMLDivElement | null>,
): void => {
	gsap.fromTo(
		closeFilterButtonRef.current,
		{
			opacity: 1,
			scale: 1,
		},
		{
			opacity: 0,
			scale: 0.6,
			duration: 0.25,
			ease: "power2.out",
		},
	);
};
