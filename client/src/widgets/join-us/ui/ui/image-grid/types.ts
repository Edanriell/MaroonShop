export type Image = {
	id: string;
	galleryImageId: number;
	imgSm: string;
	imgMd: string;
	imgLg: string;
	label: string;
};

export type Images = Array<Image>;

export type GallerySize = 4 | 6;

export type GalleryProps = {
	className?: string;
};

export type GalleryImageProps = {
	image: Image;
};
