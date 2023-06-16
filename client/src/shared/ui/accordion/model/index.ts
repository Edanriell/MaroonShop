import { MutableRefObject } from "react";

import { gsap } from "gsap";

export const displayAccordionContent = (
	accordionContentRef: MutableRefObject<HTMLDivElement | null>,
): void => {
	gsap.set(accordionContentRef.current, {
		height: 0,
		opacity: 0,
		translateY: "20px",
	});
	gsap.to(accordionContentRef.current, {
		height: "auto",
		opacity: 1,
		translateY: "0px",
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
		translateY: "20px",
		ease: "power2.out",
		onComplete: () => {
			gsap.set(accordionContentRef.current, { height: 0 });
			handleTriggerClick();
		},
	});
};

export const transformPlusToMinus = (
	plusIconBar1Ref: MutableRefObject<HTMLDivElement | null>,
	plusIconBar2Ref: MutableRefObject<HTMLDivElement | null>,
): void => {
	gsap.set(plusIconBar1Ref.current, {
		rotate: 90,
	});
	gsap.set(plusIconBar2Ref.current, {
		rotate: 0,
	});
	gsap.to(plusIconBar1Ref.current, {
		rotate: 0,
		duration: 0.5,
		ease: "power2.out",
	});
	gsap.to(plusIconBar2Ref.current, {
		rotate: -90,
		duration: 0.5,
		opacity: 0,
		ease: "power2.out",
	});
};

export const transformMinusToPlus = (
	plusIconBar1Ref: MutableRefObject<HTMLDivElement | null>,
	plusIconBar2Ref: MutableRefObject<HTMLDivElement | null>,
): void => {
	gsap.to(plusIconBar1Ref.current, {
		rotate: 90,
		duration: 0.5,
		ease: "power2.out",
	});
	gsap.to(plusIconBar2Ref.current, {
		rotate: 0,
		duration: 0.5,
		opacity: 1,
		ease: "power2.out",
	});
};
