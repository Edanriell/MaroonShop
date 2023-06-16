import { useRef, useState, useEffect, useLayoutEffect, useCallback, memo, FC } from "react";
import { gsap } from "gsap";
import { register } from "swiper/element/bundle";

import { Spinner, Button } from "shared/ui";
import { GalleryImage, galleryApi } from "shared/api";
import { useControlScrollbar } from "shared/lib/hooks";

import { GalleryPagination, GalleryNavigation, GalleryContainer } from "./ui";
import {
	isFirstSlideActive,
	isLastSlideActive,
	displayGallery,
	hideGallery,
	displayGalleryBackdrop,
	hideGalleryBackdrop,
	isGalleryImage,
	setInitialSlide,
} from "./model";

import { GalleryProps } from "./types";

import styles from "./styles.module.scss";
import "./styles.scss";

register();

const MemoizedGalleryNavigation = memo(GalleryNavigation);
const MemoizedGalleryPagination = memo(GalleryPagination);

const Gallery: FC<GalleryProps> = ({ onGalleryClose, activeSlide }) => {
	const [images, setImages] = useState<GalleryImage[]>([]);
	const [totalSlides, setTotalSlides] = useState<number>(0);
	const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isSuccessfullyLoaded, setIsSuccessfullyLoaded] = useState<boolean>(false);
	const [reload, setReload] = useState<number>(Math.random());

	const galleryBackdropRef = useRef<HTMLDivElement | null>(null);
	const galleryRef = useRef<HTMLDivElement | null>(null);
	const gallerySliderRef = useRef<HTMLElement | null>(null);

	const [galleryBackdropCtx] = useState(gsap.context(() => {}, galleryBackdropRef));
	const [galleryCtx] = useState(gsap.context(() => {}, galleryRef));

	useControlScrollbar();

	useLayoutEffect(() => {
		displayGallery(galleryRef);
		displayGalleryBackdrop(galleryBackdropRef);

		galleryCtx.add("remove", () => {
			hideGallery(galleryRef, onGalleryClose);
		});

		galleryBackdropCtx.add("remove", () => {
			hideGalleryBackdrop(galleryBackdropRef);
		});

		return () => {
			galleryCtx.revert();
			galleryBackdropCtx.revert();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [galleryBackdropCtx, galleryCtx]);

	useLayoutEffect(() => {
		async function getImages() {
			try {
				setIsLoading(true);
				const images = await galleryApi.gallery.getGalleryImages();
				if (images.data && Array.isArray(images.data)) {
					const validImages = images.data.filter(isGalleryImage);
					setImages(validImages);
					setTotalSlides(images.data.length);
				}
				setIsSuccessfullyLoaded(true);
				if (activeSlide) setInitialSlide(gallerySliderRef, activeSlide);
			} catch (error) {
				// eslint-disable-next-line no-console
				console.error(error);
				setIsSuccessfullyLoaded(false);
			} finally {
				setIsLoading(false);
			}
		}

		getImages();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [reload]);

	useEffect(() => {
		if (!gallerySliderRef.current) return;
		const slider = (gallerySliderRef.current as any).swiper;

		function handleSlideChange() {
			setCurrentSlideIndex(slider?.realIndex);
		}

		slider?.on("slideChange", handleSlideChange);

		return () => {
			slider?.off("slideChange", handleSlideChange);
		};
	}, [images]);

	const handlePreviousSlideButtonClick = useCallback(() => {
		if (!gallerySliderRef.current) return;
		(gallerySliderRef.current as any).swiper.slidePrev();
	}, []);

	const handleNextSlideButtonClick = useCallback(() => {
		if (!gallerySliderRef.current) return;
		(gallerySliderRef.current as any).swiper.slideNext();
	}, []);

	function handleGalleryClose() {
		galleryBackdropCtx.remove();
		galleryCtx.remove();
	}

	if (isLoading) {
		return (
			<GalleryContainer
				galleryBackdropRef={galleryBackdropRef}
				galleryRef={galleryRef}
				onGalleryClose={handleGalleryClose}
			>
				{isLoading && (
					<div
						className={
							"absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
						}
					>
						<Spinner
							width={"3rem"}
							height={"3rem"}
							color={"zodiac-blue-950"}
							className={"w-[5rem] h-[5rem]"}
						/>
					</div>
				)}
			</GalleryContainer>
		);
	}

	if (!isSuccessfullyLoaded) {
		return (
			<GalleryContainer
				galleryBackdropRef={galleryBackdropRef}
				galleryRef={galleryRef}
				onGalleryClose={handleGalleryClose}
			>
				<div
					className={
						"absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] " +
						"flex flex-col items-center gap-y-[1rem] text-blue-zodiac-950"
					}
				>
					<p className={"font-medium font-mPlus text-sm-22px"}>
						Не удалось загрузить галерею.
					</p>
					<Button
						text={"Обновить"}
						borderColor={"#122947"}
						backgroundColor={"#122947"}
						textColor={"#FFF"}
						onClick={() => setReload(Math.random())}
					/>
				</div>
			</GalleryContainer>
		);
	}

	return (
		<GalleryContainer
			galleryBackdropRef={galleryBackdropRef}
			galleryRef={galleryRef}
			onGalleryClose={handleGalleryClose}
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
				{images.length > 0 &&
					images.map((image) => {
						return (
							<swiper-slide key={image.imageId} lazy="true">
								<div
									className={
										"swiper-zoom-container w-full h-[100vw] max-h-[80rem]"
									}
								>
									<img
										src={image.imageUrl}
										alt="Присоединяйтесь к нам"
										className={
											"w-full h-[100vw] max-h-[80rem] " + styles.imageFit
										}
										loading="lazy"
									/>
									<div className={"swiper-lazy-preloader"}></div>
								</div>
							</swiper-slide>
						);
					})}
			</swiper-container>
			<MemoizedGalleryNavigation
				onNextSlideButtonClick={handleNextSlideButtonClick}
				onPreviousSlideButtonClick={handlePreviousSlideButtonClick}
				isFirstSlideActive={isFirstSlideActive({
					activeSlide: (gallerySliderRef.current as any)?.swiper.realIndex,
				})}
				isLastSlideActive={isLastSlideActive({
					activeSlide: (gallerySliderRef.current as any)?.swiper.realIndex,
					totalSlidesCount: (gallerySliderRef.current as any)?.swiper.slides.length,
				})}
			/>
			<MemoizedGalleryPagination
				gallerySliderRef={gallerySliderRef}
				currentSlideIndex={currentSlideIndex}
				totalSlides={totalSlides}
			/>
		</GalleryContainer>
	);
};

export default Gallery;
