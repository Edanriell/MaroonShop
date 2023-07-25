import { FC, useState, useEffect } from "react";
import { register } from "swiper/element/bundle";
import { Link } from "react-router-dom";

import { ProductCard } from "entities/product";

import { useScreenSize } from "shared/lib/hooks";

import { Card3dFlip, Button } from "shared/ui";

import { MobileSliderProps } from "./types";

import styles from "./styles.module.scss";

register();

const MobileSlider: FC<MobileSliderProps> = ({ mostViewedProducts }) => {
	const [slidesCount, setSlidesCount] = useState<number>(0);
	const { width } = useScreenSize();

	useEffect(() => {
		if (width >= 520) {
			setSlidesCount(2);
		} else {
			setSlidesCount(1);
		}
	}, [width]);

	console.log(mostViewedProducts);

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
			class={styles.sliderContainer}
		>
			{mostViewedProducts.map((mostViewedProduct, id) => (
				<swiper-slide key={id}>
					{/* <Card3dFlip data={mostViewedProduct} className={styles.sliderSlide}>

					</Card3dFlip> */}
					<ProductCard
						data={mostViewedProduct}
						cardType="advanced"
						className={styles.sliderSlide}
					/>
				</swiper-slide>
			))}
		</swiper-container>
	);
};

export default MobileSlider;
