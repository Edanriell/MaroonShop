import { MutableRefObject } from "react";
import { gsap } from "gsap";

export const displayElement = (elementRef: MutableRefObject<HTMLElement | null>): void => {
	gsap.fromTo(
		elementRef.current,
		{
			opacity: 0,
			scale: 0.8,
		},
		{
			opacity: 1,
			scale: 1,
			duration: 0.5,
			ease: "power2.out",
		},
	);
};
