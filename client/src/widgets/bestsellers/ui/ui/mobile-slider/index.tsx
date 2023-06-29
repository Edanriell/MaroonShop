import { useState, useEffect, FC } from "react";
import { register } from "swiper/element/bundle";

import { ProductCard } from "entities/product";

import { useScreenSize } from "shared/lib/hooks";

import { MobileSliderProps } from "./types";

import styles from "./styles.module.scss";

register();

const MobileSlider: FC<MobileSliderProps> = ({ bestSellers, className }) => {
	const [slidesCount, setSlidesCount] = useState<number>(0);
	const { width } = useScreenSize();

	useEffect(() => {
		if (width >= 520) {
			setSlidesCount(2);
		} else {
			setSlidesCount(1);
		}
	}, [width]);

	return (
		<swiper-container
			slides-per-view={slidesCount}
			keyboard="true"
			grab-cursor="true"
			speed="500"
			space-between="30"
			loop="true"
			autoplay-delay="6000"
			autoplay-pause-on-mouse-enter="true"
			class={className + " " + styles.sliderContainer}
		>
			{bestSellers.map((bestSeller, id) => (
				<swiper-slide key={id}>
					<ProductCard data={bestSeller} cardType="basic" />
				</swiper-slide>
			))}
		</swiper-container>
	);
};

export default MobileSlider;
