import { useState, useEffect, ReactNode } from "react";

import { ReactComponent as Circle } from "./assets/circle-solid.svg";
import styles from "./styles.module.scss";
import { GalleryPaginationProps } from "./types";

const GalleryPagination = ({ gallerySliderRef, currentSlideIndex }: GalleryPaginationProps) => {
	const [paginationButtons, setPaginationButtons] = useState<ReactNode[]>();

	useEffect(() => {
		if (!gallerySliderRef.current) return;

		const slider = gallerySliderRef.current.swiper;
		const slideCount = slider?.slides.length;

		if (!slideCount) return;

		function createButtons() {
			const buttons: ReactNode[] = [];

			for (let i = 0; i < slideCount; i++) {
				buttons.push(
					<button key={i} className={styles.circleShadow + " rounded-s-full"}>
						<Circle
							className={
								styles.circleAnimation +
								` w-[1.5rem] h-[1.5rem] ease-in-out duration-500 transition-all ${
									currentSlideIndex === i
										? "text-white"
										: "text-black opacity-[0.3]"
								}`
							}
							data-image-id={i}
						/>
						<span className="sr-only">Перейти на слайд номер {i}</span>
					</button>,
				);
			}
			return buttons;
		}

		const buttons = createButtons();

		setPaginationButtons(buttons);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentSlideIndex]);

	function handleCircleClick(event: any) {
		const imageId = event.target.parentElement.getAttribute("data-image-id");
		gallerySliderRef.current.swiper.slideTo(Number(imageId));
	}

	return (
		<div
			onClick={handleCircleClick}
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
