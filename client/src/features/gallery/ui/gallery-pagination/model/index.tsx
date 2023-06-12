import { ReactNode } from "react";

import { CreateCircleButtonsParameters } from "./types";

import { ReactComponent as Circle } from "./assets/circle-solid.svg";

import styles from "./styles.module.scss";

export const createCircleButtons = ({
	totalSlides,
	currentSlideIndex,
	handleCircleClick,
}: CreateCircleButtonsParameters): ReactNode[] => {
	const buttons: ReactNode[] = [];

	for (let i = 0; i < totalSlides; i++) {
		buttons.push(
			<button
				key={i}
				className={`${styles.circleShadow} rounded-s-full`}
				onClick={() => handleCircleClick(i)}
			>
				<Circle
					className={`${
						styles.circleAnimation
					} w-[1.5rem] h-[1.5rem] ease-in-out duration-500 transition-all ${
						currentSlideIndex === i ? "text-white" : "text-black opacity-[0.3]"
					}`}
					data-image-id={i}
				/>
				<span className="sr-only">Перейти на слайд номер {i}</span>
			</button>,
		);
	}

	return buttons;
};
