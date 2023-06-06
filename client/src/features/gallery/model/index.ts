import { MutableRefObject } from "react";
import { gsap } from "gsap";

import { isFirstSlideActiveParameters, isLastSlideActiveParameters } from "./types";

export const isFirstSlideActive = ({ activeSlide }: isFirstSlideActiveParameters): boolean =>
	activeSlide === 0;

export const isLastSlideActive = ({
	activeSlide,
	totalSlidesCount,
}: isLastSlideActiveParameters): boolean => totalSlidesCount - 1 === activeSlide;

export const displayGallery = (galleryRef: MutableRefObject<HTMLDivElement | null>): void => {
	gsap.fromTo(
		galleryRef.current,
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

export const hideGallery = (
	galleryRef: MutableRefObject<HTMLDivElement | null>,
	closeModal: () => void,
): void => {
	gsap.fromTo(
		galleryRef.current,
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

export const displayGalleryBackdrop = (
	galleryBackdropRef: MutableRefObject<HTMLDivElement | null>,
): void => {
	gsap.fromTo(
		galleryBackdropRef.current,
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

export const hideGalleryBackdrop = (
	galleryBackdropRef: MutableRefObject<HTMLDivElement | null>,
): void => {
	gsap.fromTo(
		galleryBackdropRef.current,
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
