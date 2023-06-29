import { gsap } from "gsap";

export const displayInputCircle = (inputCircleRef: HTMLDivElement): void => {
	gsap.fromTo(
		inputCircleRef,
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

export const hideInputCircle = (inputCircleRef: HTMLDivElement): void => {
	gsap.fromTo(
		inputCircleRef,
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
	elementRef: HTMLLabelElement;
}): void => {
	gsap.fromTo(
		elementRef,
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
