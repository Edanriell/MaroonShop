import { ReactComponent as XmarkSvg } from "./assets/xmark-solid.svg";
import styles from "./styles.module.scss";
import { GalleryContainerProps } from "./types";

const GalleryContainer = ({
	galleryBackdropRef,
	galleryRef,
	onGalleryClose,
	children,
}: GalleryContainerProps) => {
	return (
		<div
			ref={galleryBackdropRef}
			className={
				"fixed top-0 left-0 z-40 w-full h-full " +
				"bg-[rgba(0,0,0,0.6)] flex flex-row items-center " +
				"justify-around"
			}
		>
			<button
				onClick={onGalleryClose}
				className={"absolute top-[2rem] right-[2rem] w-[4.6rem] h-[4.6rem]"}
			>
				<XmarkSvg
					className={
						styles.closeButtonAnimations +
						" ease-in-out duration-500 transition-transform text-white"
					}
				/>
				<span className={"sr-only"}>Закрыть галерею</span>
			</button>
			<div
				ref={galleryRef}
				className={
					styles.galleryShadow +
					" z-[50] border-none rounded-[0.2rem] max-w-[120rem] w-[90%] mr-[1.5rem] " +
					"ml-[1.5rem] mt-[1.5rem] mb-[1.5rem] bg-desert-storm-50 max-h-[80rem] relative h-[100vw]"
				}
			>
				{children}
			</div>
		</div>
	);
};

export default GalleryContainer;
