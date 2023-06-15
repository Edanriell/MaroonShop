import { MutableRefObject } from "react";

import { gsap } from "gsap";

export const displayAccordionContent = (
	accordionContentRef: MutableRefObject<HTMLDivElement | null>,
): void => {
	gsap.set(accordionContentRef.current, { height: "auto" });
	gsap.from(accordionContentRef.current, {
		height: 0,
		opacity: 0,
		translateY: "10px",
		duration: 0.5,
		ease: "power2.out",
	});
};

export const hideAccordionContent = (
	accordionContentRef: MutableRefObject<HTMLDivElement | null>,
	handleTriggerClick: () => void,
): void => {
	gsap.to(accordionContentRef.current, {
		height: 0,
		opacity: 0,
		duration: 0.25,
		translateY: "10px",
		ease: "power2.out",
		onComplete: () => {
			gsap.set(accordionContentRef.current, { height: 0 });
			handleTriggerClick();
		},
	});
};
