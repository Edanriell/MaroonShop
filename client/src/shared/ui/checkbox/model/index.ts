import { MutableRefObject } from "react";

import { gsap } from "gsap";

export const displayInputCircle = (
	inputCircleRef: MutableRefObject<HTMLDivElement | null>,
	setIsCheckboxLocked: () => void,
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
			onComplete: () => setIsCheckboxLocked(),
		},
	);
};

export const hideInputCircle = (
	inputCircleRef: MutableRefObject<HTMLDivElement | null>,
	setIsChecked: () => void,
	setIsCheckboxLocked: () => void,
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
			onComplete: () => {
				setIsChecked();
				setIsCheckboxLocked();
			},
		},
	);
};

export const changeLabelColor = ({
	startColor,
	endColor,
	elementRef,
}: {
	startColor: string;
	endColor: string;
	elementRef: MutableRefObject<HTMLLabelElement | null>;
}): void => {
	gsap.fromTo(
		elementRef.current,
		{
			color: startColor,
			duration: 0.5,
			ease: "power2.out",
		},
		{
			color: endColor,
			duration: 0.5,
			ease: "power2.out",
		},
	);
};
