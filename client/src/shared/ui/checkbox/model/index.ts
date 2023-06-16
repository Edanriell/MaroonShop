import { MutableRefObject } from "react";

import { gsap } from "gsap";

export const displayInputCircle = (
	inputCircleRef: MutableRefObject<HTMLDivElement | null>,
): void => {
	gsap.fromTo(
		inputCircleRef.current,
		{
			opacity: 0,
			scale: 0.6,
			duration: 0.5,
			ease: "power2.out",
		},
		{
			opacity: 1,
			scale: 1,
			duration: 0.5,
			ease: "power2.out",
		},
	);
};

export const hideInputCircle = (
	inputCircleRef: MutableRefObject<HTMLDivElement | null>,
	setIsChecked: () => void,
): void => {
	gsap.fromTo(
		inputCircleRef.current,
		{
			opacity: 1,
			scale: 1,
			duration: 0.5,
			ease: "power2.out",
		},
		{
			opacity: 0,
			scale: 0.6,
			duration: 0.5,
			ease: "power2.out",
			onComplete: () => setIsChecked(),
		},
	);
};
