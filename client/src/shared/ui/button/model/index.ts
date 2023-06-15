import { gsap } from "gsap";

import { HoverEffectParameters } from "./types";

export const mouseEnterHoverEffect = ({
	buttonBoxRef,
	buttonTextRef,
	buttonRef,
	borderColor,
	backgroundColor,
	textColor,
}: HoverEffectParameters): void => {
	gsap.fromTo(
		buttonBoxRef.current,
		{ translateY: "100%", backgroundColor: backgroundColor ? `${backgroundColor}` : "#FFF" },
		{
			translateY: "0%",
			backgroundColor: backgroundColor ? `${backgroundColor}` : "#FFF",
			duration: 0.4,
			ease: "power2.out",
		},
	);

	gsap.fromTo(
		buttonTextRef.current,
		{ translateY: "100%", color: "#122947", opacity: 0 },
		{
			translateY: "0%",
			color: textColor ? `${textColor}` : "#122947",
			opacity: 1,
			duration: 0.25,
			ease: "power2.out",
		},
	);

	gsap.fromTo(
		buttonRef.current,
		{ borderColor: borderColor ? `${borderColor}` : "#b3bac1" },
		{
			borderColor: borderColor ? `${borderColor}` : "#ebecee",
			duration: 0.4,
			ease: "power2.out",
		},
	);
};

export const mouseLeaveHoverEffect = ({
	buttonBoxRef,
	buttonTextRef,
	buttonRef,
	borderColor,
	backgroundColor,
	textColor,
}: HoverEffectParameters): void => {
	gsap.fromTo(
		buttonBoxRef.current,
		{ translateY: "0%", backgroundColor: backgroundColor ? `${backgroundColor}` : "#FFF" },
		{
			translateY: "-100%",
			backgroundColor: backgroundColor ? `${backgroundColor}` : "#FFF",
			duration: 0.4,
			ease: "power2.out",
		},
	);

	gsap.fromTo(
		buttonTextRef.current,
		{ translateY: "-100%", color: textColor ? `${textColor}` : "#122947", opacity: 0 },
		{
			translateY: "0%",
			color: "#122947",
			opacity: 1,
			duration: 0.25,
			ease: "power2.out",
		},
	);

	gsap.fromTo(
		buttonRef.current,
		{ borderColor: borderColor ? `${borderColor}` : "#ebecee" },
		{
			borderColor: borderColor ? `${borderColor}` : "#b3bac1",
			duration: 0.4,
			ease: "power2.out",
		},
	);
};
