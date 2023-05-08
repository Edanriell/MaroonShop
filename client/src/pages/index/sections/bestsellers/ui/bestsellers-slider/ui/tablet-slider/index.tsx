import { useEffect, useRef } from "react";
import { register } from "swiper/element/bundle";

import { ProductCard } from "entities/product";

import arrowLeftSvg from "./assets/arrow-left.svg";
import arrowRightSvg from "./assets/arrow-right.svg";

import styles from "./styles.module.scss";

register();

type Props = {
	bestSellers: Array<import("shared/api").Product>;
	classes: string;
};

const TabletSlider = ({ bestSellers, classes }: Props) => {
	const sliderRef = useRef(null);

	useEffect(() => {
		const sliderContainer = sliderRef.current;

		const params = {
			injectStyles: [
				`
                    .swiper-button-next,
                    .swiper-button-prev {
                        background-color: transparent;
                        padding: 0;
                        margin: 0;
                        display: inline-block;
                        position: absolute;
                    }

                    .swiper-button-prev {
                        background-image: url(${arrowLeftSvg});
                        background-repeat: no-repeat;
                        width: 26px;
                        height: 12px;
                        top: 100%;
                        transform: translateY(-100%);
                        left: 340px;
                        z-index: 100;
                    }

                    .swiper-button-next {
                        background-image: url(${arrowRightSvg});
                        background-repeat: no-repeat;
                        width: 26px;
                        height: 12px;
                        top: 100%;
                        transform: translateY(-100%);
                        left: 398px;
                        z-index: 100;
                    }
                    
                    .swiper-button-next::after,
                    .swiper-button-prev::after {
                        content: "";
                    }
                `,
			],
		};

		Object.assign(sliderContainer!, params);
		(sliderContainer as any).initialize();
	}, []);

	return (
		<swiper-container
			ref={sliderRef}
			init="false"
			slides-per-view="4"
			keyboard="true"
			grab-cursor="true"
			speed="500"
			loop="true"
			space-between="30"
			update-on-window-resize="true"
			width="1010"
			navigation="true"
			autoplay-delay="6000"
			autoplay-pause-on-mouse-enter="true"
			class={classes + " " + "relative pb-[3.7rem]"}
		>
			{bestSellers.map((bestSeller, id) => (
				<swiper-slide key={id}>
					<ProductCard data={bestSeller} simplified />
				</swiper-slide>
			))}
			<button
				className={
					"absolute w-[100%] h-[3.7rem] top-[100%] z-[200] inline-block bg-transparent" +
					" " +
					styles.defaultCursor
				}
			></button>
		</swiper-container>
	);
};

export default TabletSlider;
