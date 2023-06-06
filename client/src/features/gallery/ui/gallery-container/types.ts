import { ReactNode, MutableRefObject } from "react";

export type GalleryContainerProps = {
	galleryBackdropRef: MutableRefObject<HTMLDivElement | null>;
	galleryRef: MutableRefObject<HTMLDivElement | null>;
	onGalleryClose: () => void;
	children: ReactNode;
};
