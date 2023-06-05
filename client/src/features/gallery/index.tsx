import { useRef, MouseEvent, useState, useEffect } from "react";
import { register } from "swiper/element/bundle";

import { GalleryPagination, GalleryNavigation } from "./ui";
import styles from "./styles.module.scss";

register();

const Gallery = () => {
	const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
	const galleryBackdropRef = useRef<HTMLDivElement | null>(null);
	const galleryRef = useRef<HTMLDivElement | null>(null);
	const gallerySliderRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		if (!gallerySliderRef.current) return;
		const slider = (gallerySliderRef.current as any).swiper;

		function handleSlideChange() {
			setCurrentSlideIndex(slider.realIndex);
		}

		slider.on("slideChange", handleSlideChange);

		return () => {
			slider.off("slideChange", handleSlideChange);
		};
	}, []);

	function handlePreviousSlideButtonClick() {
		if (!gallerySliderRef.current) return;
		(gallerySliderRef.current as any).swiper.slidePrev();
	}

	function handleNextSlideButtonClick() {
		if (!gallerySliderRef.current) return;
		(gallerySliderRef.current as any).swiper.slideNext();
	}

	function handleCloseGallery(event: MouseEvent) {
		// console.log("Close");
	}

	return (
		<div
			ref={galleryBackdropRef}
			onMouseDown={(event) => handleCloseGallery(event)}
			className={
				"fixed top-0 left-0 z-40 w-full h-full " +
				"bg-[rgba(0,0,0,0.6)] flex flex-row items-center " +
				"justify-around"
			}
		>
			<div
				ref={galleryRef}
				className={
					styles.galleryShadow +
					" z-[50] border-none rounded-[0.2rem] max-w-[120rem] w-[90%] mr-[1.5rem] " +
					"ml-[1.5rem] mt-[1.5rem] mb-[1.5rem] bg-white max-h-[80rem] relative"
				}
			>
				<swiper-container
					ref={gallerySliderRef}
					init="true"
					slides-per-view="1"
					keyboard="true"
					grab-cursor="true"
					speed="500"
					update-on-window-resize="true"
					lazy="true"
					zoom="true"
					class="border-none rounded-[0.2rem] relative"
				>
					<swiper-slide lazy="true">
						<div className="swiper-zoom-container w-full h-[100vw] max-h-[80rem]">
							<img
								src="http://localhost:4020/gallery-images/1/full.jpg"
								alt=""
								className={"w-full h-[100vw] max-h-[80rem] " + styles.imageFit}
								loading="lazy"
							/>
						</div>
					</swiper-slide>
					<swiper-slide lazy="true">
						<div className="swiper-zoom-container w-full h-[100vw] max-h-[80rem]">
							<img
								src="http://localhost:4020/gallery-images/2/full.jpg"
								alt=""
								className={"w-full h-[100vw] max-h-[80rem] " + styles.imageFit}
								loading="lazy"
							/>
						</div>
					</swiper-slide>
					<swiper-slide lazy="true">
						<div className="swiper-zoom-container w-full h-[100vw] max-h-[80rem]">
							<img
								src="http://localhost:4020/gallery-images/3/full.jpg"
								alt=""
								className={"w-full h-[100vw] max-h-[80rem] " + styles.imageFit}
								loading="lazy"
							/>
						</div>
					</swiper-slide>
					<swiper-slide lazy="true">
						<div className="swiper-zoom-container w-full h-[100vw] max-h-[80rem]">
							<img
								src="http://localhost:4020/gallery-images/4/full.jpg"
								alt=""
								className={"w-full h-[100vw] max-h-[80rem] " + styles.imageFit}
								loading="lazy"
							/>
						</div>
					</swiper-slide>
					<swiper-slide lazy="true">
						<div className="swiper-zoom-container w-full h-[100vw] max-h-[80rem]">
							<img
								src="http://localhost:4020/gallery-images/5/full.jpg"
								alt=""
								className={"w-full h-[100vw] max-h-[80rem] " + styles.imageFit}
								loading="lazy"
							/>
						</div>
					</swiper-slide>
					<swiper-slide lazy="true">
						<div className="swiper-zoom-container w-full h-[100vw] max-h-[80rem]">
							<img
								src="http://localhost:4020/gallery-images/6/full.jpg"
								alt=""
								className={"w-full h-[100vw] max-h-[80rem] " + styles.imageFit}
								loading="lazy"
							/>
						</div>
					</swiper-slide>
				</swiper-container>
				<GalleryNavigation
					onNextSlideButtonClick={handleNextSlideButtonClick}
					onPreviousSlideButtonClick={handlePreviousSlideButtonClick}
				/>
				<GalleryPagination
					gallerySliderRef={gallerySliderRef}
					currentSlideIndex={currentSlideIndex}
				/>
			</div>
		</div>
	);
};

export default Gallery;
