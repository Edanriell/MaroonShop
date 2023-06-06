import { RefObject } from "react";

export type GalleryPaginationProps = {
	gallerySliderRef: RefObject<any>;
	currentSlideIndex: number;
	totalSlides: number;
};
