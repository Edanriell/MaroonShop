import classNames from "classnames";

import { ReactComponent as LeftChevron } from "./assets/chevron-left-solid.svg";
import { ReactComponent as RightChevron } from "./assets/chevron-right-solid.svg";
import { GalleryNavigationProps } from "./types";
import styles from "./styles.module.scss";

const GalleryNavigation = ({
	onNextSlideButtonClick,
	onPreviousSlideButtonClick,
	isFirstSlideActive,
	isLastSlideActive,
}: GalleryNavigationProps) => {
	const leftChevronClasses = classNames({
		"opacity-25": isFirstSlideActive,
	});
	const rightChevronClasses = classNames({
		"opacity-25": isLastSlideActive,
	});

	return (
		<div
			className={
				"absolute top-[50%] left-[50%] z-[100] translate-y-[-50%] translate-x-[-50%]"
			}
		>
			<button
				disabled={isFirstSlideActive}
				className={"absolute left-[-42vw]"}
				onClick={onPreviousSlideButtonClick}
			>
				<LeftChevron
					className={
						leftChevronClasses +
						" " +
						styles.leftChevronAnimation +
						" w-[5rem] h-[5rem] text-white transition-all ease-in-out duration-500"
					}
				/>
				<span className="sr-only">Показать предыдущий слайд</span>
			</button>
			<button
				disabled={isLastSlideActive}
				className={"absolute right-[-42vw]"}
				onClick={onNextSlideButtonClick}
			>
				<RightChevron
					className={
						rightChevronClasses +
						" " +
						styles.rightChevronAnimation +
						" w-[5rem] h-[5rem] text-white transition-all ease-in-out duration-500"
					}
				/>
				<span className="sr-only">Показать следующий слайд</span>
			</button>
		</div>
	);
};

export default GalleryNavigation;
