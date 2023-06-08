import { MutableRefObject } from "react";
import { gsap } from "gsap";

export const displaySnackbar = (snackbarRef: MutableRefObject<HTMLDivElement | null>): void => {
	gsap.fromTo(
		snackbarRef.current,
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

export const hideSnackbar = (
	snackbarRef: MutableRefObject<HTMLDivElement | null>,
	handleCloseSnackbar: () => void,
): void => {
	gsap.fromTo(
		snackbarRef.current,
		{
			opacity: 1,
			scale: 1,
		},
		{
			opacity: 0,
			scale: 0.8,
			duration: 0.15,
			ease: "power2.out",
			onComplete: () => {
				handleCloseSnackbar();
			},
		},
	);
};
