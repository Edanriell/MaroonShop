import { useState, useEffect, ReactNode, FC, MouseEvent } from "react";

import { createCircleButtons } from "./model";

import { GalleryPaginationProps } from "./types";

const GalleryPagination: FC<GalleryPaginationProps> = ({
	gallerySliderRef,
	currentSlideIndex,
	totalSlides,
}) => {
	const [paginationButtons, setPaginationButtons] = useState<ReactNode[]>();

	useEffect(() => {
		if (!gallerySliderRef.current || totalSlides === undefined) return;

		const buttons = createCircleButtons({ totalSlides, currentSlideIndex });
		setPaginationButtons(buttons);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentSlideIndex]);

	function handlePaginationButtonClick(event: MouseEvent) {
		const targetElement = event.target as HTMLElement;
		const targetElementParent = targetElement.parentElement;
		const imageId = targetElementParent?.getAttribute("data-image-id");
		gallerySliderRef.current.swiper.slideTo(Number(imageId));
	}

	return (
		<div
			onClick={handlePaginationButtonClick}
			className={
				"flex flex-row items-center justify-center gap-x-[0.5rem] " +
				"absolute bottom-[-7.5%] left-[50%] translate-x-[-50%]"
			}
		>
			{paginationButtons}
		</div>
	);
};

export default GalleryPagination;
