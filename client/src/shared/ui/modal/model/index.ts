import { MutableRefObject } from "react";
import { gsap } from "gsap";

export const displayModal = (modalRef: MutableRefObject<null>): void => {
	gsap.fromTo(
		modalRef.current,
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

export const hideModal = (modalRef: MutableRefObject<null>, closeModal: () => void): void => {
	gsap.fromTo(
		modalRef.current,
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
				closeModal();
			},
		},
	);
};

export const displayBackdrop = (backdropRef: MutableRefObject<null>): void => {
	gsap.fromTo(
		backdropRef.current,
		{
			opacity: 0,
		},
		{
			opacity: 1,
			duration: 0.25,
			ease: "power2.out",
		},
	);
};

export const hideBackdrop = (backdropRef: MutableRefObject<null>): void => {
	gsap.fromTo(
		backdropRef.current,
		{
			opacity: 1,
		},
		{
			opacity: 0,
			duration: 0.1,
			ease: "power2.out",
		},
	);
};
