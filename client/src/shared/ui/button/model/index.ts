import { MutableRefObject } from "react";
import { gsap } from "gsap";

type Parameters = {
	buttonBoxRef: MutableRefObject<null>;
	buttonTextRef: MutableRefObject<null>;
	buttonRef: MutableRefObject<null>;
};

function mouseEnterHoverEffect({ buttonBoxRef, buttonTextRef, buttonRef }: Parameters) {
	console.log("runs2")
	gsap.fromTo(
		buttonBoxRef.current,
		{ translateY: "100%" },
		{ translateY: "0%", duration: 0.4, ease: "power2.out" },
	);

	gsap.fromTo(
		buttonTextRef.current,
		{ translateY: "100%", color: "#122947", opacity: 0 },
		{ translateY: "0%", color: "#122947", opacity: 1, duration: 0.25, ease: "power2.out" },
	);

	gsap.fromTo(
		buttonRef.current,
		{ borderColor: "#b3bac1" },
		{ borderColor: "#ebecee", duration: 0.4, ease: "power2.out" },
	);
}

function mouseLeaveHoverEffect({ buttonBoxRef, buttonTextRef, buttonRef }: Parameters) {
	console.log("runs1")
	gsap.fromTo(
		buttonBoxRef.current,
		{ translateY: "0%" },
		{ translateY: "-100%", duration: 0.4, ease: "power2.out" },
	);

	gsap.fromTo(
		buttonTextRef.current,
		{ translateY: "-100%", color: "#122947", opacity: 0 },
		{ translateY: "0%", color: "#122947", opacity: 1, duration: 0.25, ease: "power2.out" },
	);

	gsap.fromTo(
		buttonRef.current,
		{ borderColor: "#ebecee" },
		{ borderColor: "#b3bac1", duration: 0.4, ease: "power2.out" },
	);
}

export { mouseEnterHoverEffect, mouseLeaveHoverEffect };
