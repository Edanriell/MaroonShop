import { ReactComponent as LeftChevron } from "./assets/chevron-left-solid.svg";
import { ReactComponent as RightChevron } from "./assets/chevron-right-solid.svg";
import { GalleryNavigationProps } from "./types";

const GalleryNavigation = ({
	onNextSlideButtonClick,
	onPreviousSlideButtonClick,
}: GalleryNavigationProps) => {
	return (
		<div
			className={
				"absolute top-[50%] left-0 z-[100] translate-y-[-50%] " +
				"flex flex-row items-start justify-between w-full"
			}
		>
			<button className={"ml-[-8rem]"} onClick={onPreviousSlideButtonClick}>
				<LeftChevron className={"w-[5rem] h-[5rem] text-white"} />
			</button>
			<button className={"mr-[-8rem]"} onClick={onNextSlideButtonClick}>
				<RightChevron className={"w-[5rem] h-[5rem] text-white"} />
			</button>
		</div>
	);
};

export default GalleryNavigation;
