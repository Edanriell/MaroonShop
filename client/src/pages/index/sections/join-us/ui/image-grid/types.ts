export type Image = {
	id: string;
	imgSm: string;
	imgMd: string;
	imgLg: string;
	label: string;
};

export type Images = Array<Image>;

export type GallerySize = 4 | 6;

export type GalleryProps = {
	classes?: string;
};

export type GalleryImageProps = {
	image: Image;
};
