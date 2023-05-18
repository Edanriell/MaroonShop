import { gsap } from "gsap";

import { MouseMoveEffectParameters, MouseOutEffectParameters } from "./types";

export const mouseMoveEffect = ({
	event,
	cardContentRef,
	cardHighlightRef,
}: MouseMoveEffectParameters): void => {
	const verticalCoordinates =
		-(event.nativeEvent.offsetY - event.currentTarget.offsetHeight / 2) * 0.05;
	const horizontalCoordinates =
		(event.nativeEvent.offsetX - event.currentTarget.offsetWidth / 2) * 0.05;

	gsap.to(cardContentRef.current, {
		rotateX: verticalCoordinates,
		rotateY: horizontalCoordinates,
		duration: 0.5,
		ease: "power2.out",
	});

	if (cardHighlightRef.current) {
		gsap.to(cardHighlightRef.current, {
			translateX: -horizontalCoordinates * 32,
			translateY: verticalCoordinates * 24,
			duration: 0.5,
			ease: "power2.out",
		});
	}
};

export const mouseOutEffect = ({
	cardContentRef,
	cardHighlightRef,
}: MouseOutEffectParameters): void => {
	gsap.to(cardContentRef.current, {
		rotateX: 0,
		rotateY: 0,
		duration: 0.5,
		ease: "power2.out",
	});

	if (cardHighlightRef.current) {
		gsap.to(cardHighlightRef.current, {
			translateX: 0,
			translateY: 0,
			duration: 0.5,
			ease: "power2.out",
		});
	}
};
