import { useRef, MouseEvent } from "react";
import { register } from "swiper/element/bundle";

import styles from "./styles.module.scss";

register();

const Gallery = () => {
	const galleryBackdropRef = useRef<HTMLDivElement | null>(null);
	const galleryRef = useRef<HTMLDivElement | null>(null);
	const gallerySliderRef = useRef(null);

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
					"ml-[1.5rem] mt-[1.5rem] mb-[1.5rem] bg-white max-h-[80rem]"
				}
				// max-h-[80rem] h-[100%]
			>
				<swiper-container
					ref={gallerySliderRef}
					init="true"
					slides-per-view="1"
					keyboard="true"
					grab-cursor="true"
					speed="500"
					loop="true"
					update-on-window-resize="true"
					autoplay-delay="6000"
					autoplay-pause-on-mouse-enter="true"
					class="border-none rounded-[0.2rem]"
				>
					<swiper-slide>
						<img
							src="http://localhost:4020/gallery-images/1/full.jpg"
							alt=""
							className="w-full h-[100vw] max-h-[80rem] object-cover"
						/>
					</swiper-slide>
					<swiper-slide>
						<img
							src="http://localhost:4020/gallery-images/2/full.jpg"
							alt=""
							className="w-full h-[100vw] max-h-[80rem] object-cover"
						/>
					</swiper-slide>
					<swiper-slide>
						<img
							src="http://localhost:4020/gallery-images/3/full.jpg"
							alt=""
							className="w-full h-[100vw] max-h-[80rem] object-cover"
						/>
					</swiper-slide>
					<swiper-slide>
						<img
							src="http://localhost:4020/gallery-images/4/full.jpg"
							alt=""
							className="w-full h-[100vw] max-h-[80rem] object-cover"
						/>
					</swiper-slide>
					<swiper-slide>
						<img
							src="http://localhost:4020/gallery-images/5/full.jpg"
							alt=""
							className="w-full h-[100vw] max-h-[80rem] object-cover"
						/>
					</swiper-slide>
					<swiper-slide>
						<img
							src="http://localhost:4020/gallery-images/6/full.jpg"
							alt=""
							className="w-full h-[100vw] max-h-[80rem] object-cover"
						/>
					</swiper-slide>
				</swiper-container>
			</div>
		</div>
	);
};

export default Gallery;
