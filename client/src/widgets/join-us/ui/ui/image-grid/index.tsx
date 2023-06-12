/* eslint-disable no-console */

import { useState, useEffect, MouseEvent, FC } from "react";
import { createPortal } from "react-dom";
import { v4 as uuidv4 } from "uuid";

import Gallery from "features/gallery";

import { useScreenSize } from "shared/lib/hooks";

import image1sm from "./assets/image-1-sm.jpg";
import image1md from "./assets/image-1-md.jpg";
import image1lg from "./assets/image-1-lg.jpg";
import image2sm from "./assets/image-2-sm.jpg";
import image2md from "./assets/image-2-md.jpg";
import image2lg from "./assets/image-2-lg.jpg";
import image3sm from "./assets/image-3-sm.jpg";
import image3md from "./assets/image-3-md.jpg";
import image3lg from "./assets/image-3-lg.jpg";
import image4sm from "./assets/image-4-sm.jpg";
import image4md from "./assets/image-4-md.jpg";
import image4lg from "./assets/image-4-lg.jpg";
import image5lg from "./assets/image-5-lg.jpg";
import image6lg from "./assets/image-6-lg.jpg";

import { Images, GalleryImageProps, GalleryProps, GallerySize } from "./types";

import styles from "./styles.module.scss";

const images: Images = [
	{
		id: uuidv4(),
		galleryImageId: 1,
		imgSm: image1sm,
		imgMd: image1md,
		imgLg: image1lg,
		label: "Присоединяйтесь к нам",
	},
	{
		id: uuidv4(),
		galleryImageId: 2,
		imgSm: image2sm,
		imgMd: image2md,
		imgLg: image2lg,
		label: "Присоединяйтесь к нам",
	},
	{
		id: uuidv4(),
		galleryImageId: 4,
		imgSm: image3sm,
		imgMd: image3md,
		imgLg: image3lg,
		label: "Присоединяйтесь к нам",
	},
	{
		id: uuidv4(),
		galleryImageId: 5,
		imgSm: image4sm,
		imgMd: image4md,
		imgLg: image4lg,
		label: "Присоединяйтесь к нам",
	},
	{
		id: uuidv4(),
		galleryImageId: 0,
		imgSm: image5lg,
		imgMd: image5lg,
		imgLg: image5lg,
		label: "Присоединяйтесь к нам",
	},
	{
		id: uuidv4(),
		galleryImageId: 3,
		imgSm: image6lg,
		imgMd: image6lg,
		imgLg: image6lg,
		label: "Присоединяйтесь к нам",
	},
];

const Image: FC<GalleryImageProps> = ({ image }) => (
	<li
		className={
			styles.imageHoverEffect +
			" relative transition-all after:ease-in-out after:duration-[250ms] overflow-hidden " +
			"before:ease-in-out before:duration-[250ms] "
		}
		data-image-id={image.galleryImageId}
	>
		<picture className={"relative col-start-1 col-end-2 row-start-1 row-end-3"}>
			<source media="(min-width:1366px)" srcSet={image.imgLg} />
			<source media="(min-width:768px)" srcSet={image.imgMd} />
			<source media="(min-width:320px)" srcSet={image.imgSm} />
			<img
				src={image.imgLg}
				alt={image.label}
				className={
					"w-[100%] h-[100%] object-cover relative " +
					"transition-transform duration-500 ease-in-out"
				}
			/>
		</picture>
	</li>
);

const ImageGrid: FC<GalleryProps> = ({ className = "" }) => {
	const [activeSlide, setActiveSlide] = useState<number>();
	const [showGallery, setShowGallery] = useState<boolean>();
	const [gallerySize, setGallerySize] = useState<GallerySize>(4);
	const { width } = useScreenSize();

	useEffect(() => {
		if (width >= 1366) {
			setGallerySize(6);
		} else {
			setGallerySize(4);
		}
	}, [width]);

	function handleImageClick(event: MouseEvent) {
		const activeImageId = (event.target as HTMLElement).getAttribute("data-image-id");

		if (!activeImageId) {
			setActiveSlide(0);

			console.error("Cant't get the target image id.");
			console.error("Check data-image-id attribute.");
		}

		setActiveSlide(Number(activeImageId));
		setShowGallery(true);
	}

	return (
		<div className={className}>
			<ul
				onClick={handleImageClick}
				className={
					"grid grid-cols-join-us-two-sm grid-rows-join-us-two-sm justify-center " +
					"md:grid-cols-join-us-two-md md:grid-rows-join-us-two-md " +
					"lg:grid-cols-join-us-two-lg lg:grid-rows-join-us-two-lg"
				}
			>
				{images.map((image, index) => {
					if (index >= gallerySize) return null;
					return <Image key={image.id} image={image} />;
				})}
			</ul>
			{showGallery &&
				createPortal(
					<Gallery
						onGalleryClose={() => setShowGallery(false)}
						activeSlide={activeSlide}
					/>,
					document.getElementById("gallery-container") as Element,
				)}
		</div>
	);
};

export default ImageGrid;
