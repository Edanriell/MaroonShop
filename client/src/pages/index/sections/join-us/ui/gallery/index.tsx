import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
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

type Image = {
	id: string;
	imgSm: string;
	imgMd: string;
	imgLg: string;
	label: string;
};

type GalleryImages = Array<Image>;

type GallerySize = 4 | 6;

type GalleryProps = {
	classes?: string;
};

type GalleryImageProps = {
	image: Image;
};

const galleryImages: GalleryImages = [
	{
		id: uuidv4(),
		imgSm: image1sm,
		imgMd: image1md,
		imgLg: image1lg,
		label: "none",
	},
	{
		id: uuidv4(),
		imgSm: image2sm,
		imgMd: image2md,
		imgLg: image2lg,
		label: "none",
	},
	{
		id: uuidv4(),
		imgSm: image3sm,
		imgMd: image3md,
		imgLg: image3lg,
		label: "none",
	},
	{
		id: uuidv4(),
		imgSm: image4sm,
		imgMd: image4md,
		imgLg: image4lg,
		label: "none",
	},
	{
		id: uuidv4(),
		imgSm: image5lg,
		imgMd: image5lg,
		imgLg: image5lg,
		label: "none",
	},
	{
		id: uuidv4(),
		imgSm: image6lg,
		imgMd: image6lg,
		imgLg: image6lg,
		label: "none",
	},
];

const GalleryImage = ({ image }: GalleryImageProps) => (
	<li>
		<picture className={`col-start-1 col-end-2 row-start-1 row-end-3`}>
			<source media="(min-width:1366px)" srcSet={image.imgLg} />
			<source media="(min-width:768px)" srcSet={image.imgMd} />
			<source media="(min-width:320px)" srcSet={image.imgSm} />
			<img src={image.imgLg} alt={image.label} className={`w-[100%] h-[100%] object-cover`} />
		</picture>
	</li>
);

const Gallery = ({ classes = "" }: GalleryProps) => {
	const [gallerySize, setGallerySize] = useState<GallerySize>(4);
	const { width } = useScreenSize();

	useEffect(() => {
		if (width >= 1366) {
			setGallerySize(6);
		} else {
			setGallerySize(4);
		}
	}, [width]);

	return (
		<div className={classes}>
			<ul
				className={`
                    grid grid-cols-join-us-two-sm grid-rows-join-us-two-sm justify-center
                    md:grid-cols-join-us-two-md md:grid-rows-join-us-two-md
                    lg:grid-cols-join-us-two-lg lg:grid-rows-join-us-two-lg
                `}
			>
				{galleryImages.map((image, index) => {
					if (index >= gallerySize) return null;
					return <GalleryImage key={image.id} image={image} />;
				})}
			</ul>
		</div>
	);
};

export default Gallery;
