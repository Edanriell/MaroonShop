import { FC, useEffect, useRef } from "react";
import { register } from "swiper/element/bundle";

import { ProductCard } from "entities/product";

import { useArrayGrouper, useScreenSize } from "shared/lib/hooks";

import { Card3dFlip } from "shared/ui";

import arrowLeftSvg from "./assets/arrow-left.svg";
import arrowRightSvg from "./assets/arrow-right.svg";

import styles from "./styles.module.scss";

import { DesktopSliderProps } from "./types";

register();

const DesktopSlider: FC<DesktopSliderProps> = ({ mostViewedProducts }) => {
	const mostViewedProductsGroupedBy4 = useArrayGrouper(mostViewedProducts, 4);
	const mostViewedProductsGroupedBy5 = useArrayGrouper(mostViewedProducts, 5);
	const mostViewedProductsGroupedBy6 = useArrayGrouper(mostViewedProducts, 6);

	const { width } = useScreenSize();

	const sliderRef = useRef<HTMLElement | null>(null);

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
						transition: all 0.25s;
						transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
                    }

                    .swiper-button-prev {
                        background-image: url(${arrowLeftSvg});
                        background-repeat: no-repeat;
                        width: 26px;
                        height: 12px;
                        top: 100%;
                        transform: translateY(-100%);
                        left: 59.3rem;
                        z-index: 100;
                    }

					.swiper-button-prev:hover {
                        transform: translateY(-100%) scale(1.1);
                    }

					.swiper-button-prev:active {
                        transform: translateY(-100%) translateX(-4px) scale(1.1);
                    }

                    .swiper-button-next {
                        background-image: url(${arrowRightSvg});
                        background-repeat: no-repeat;
                        width: 26px;
                        height: 12px;
                        top: 100%;
                        transform: translateY(-100%);
                        right: 0.2rem;
                        z-index: 100;
                    }

					.swiper-button-next:hover {
                        transform: translateY(-100%) scale(1.1);
                    }

					.swiper-button-next:active {
                        transform: translateY(-100%) translateX(4px) scale(1.1);
                    }
                    
                    .swiper-button-next::after,
                    .swiper-button-prev::after {
                        content: "";
                    }

					.swiper-pagination {
						font-size: 0;
						position: absolute;
						top: 406px;
						left: 50%;
						transform: translateX(-5%);
						display: flex;
						flex-direction: row;
						align-items: center;
					}
					  
					.swiper-pagination span {
						font-size: 1.8rem;
						font-family: MPLUS1p;
						font-style: normal;
						font-weight: 500;
						line-height: 2.61rem;
					}

					.swiper-pagination-current {
						color: #122947;
						display: flex;
						flex-direction: row;
						align-items: center;
					}

					.swiper-pagination-current::after {
						content: "";
						display: flex;
						width: 5rem;
						height: 0.1rem;
						background-color: #122947;
						position: relative;
						margin-left: 1rem;
						margin-right: 1rem;
					}

					.swiper-pagination-total {
						color: #9A9DA0;
					}

					@media only screen and (min-width: 1142px) {
						.swiper-button-prev {
							left: 94.8rem;
						}
					}

					@media only screen and (min-width: 1666px) {

					}
					
					@media only screen and (min-width: 1966px) {

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
			slides-per-view="1"
			keyboard="true"
			grab-cursor="true"
			speed="500"
			space-between="30"
			autoplay-delay="6000"
			autoplay-pause-on-mouse-enter="true"
			update-on-window-resize="true"
			navigation="true"
			pagination="true"
			pagination-type="fraction"
			class={styles.sliderContainer + " relative pb-[6.3rem]"}
		>
			{width >= 1366 &&
				width < 1666 &&
				mostViewedProductsGroupedBy4.map((mostViewedProductsGroup, id) => (
					<swiper-slide key={id}>
						<div className="flex flex-row gap-x-[3rem]">
							{mostViewedProductsGroup.map((mostViewedProduct: any, id: number) => (
								<Card3dFlip
									key={id}
									data={mostViewedProduct}
									className={styles.sliderSlide}
								>
									<ProductCard
										data={mostViewedProduct}
										cardType="advanced"
										className={styles.sliderSlide}
										backgroundImageClassName={styles.sliderSlideBackgroundImage}
									/>
								</Card3dFlip>
							))}
						</div>
					</swiper-slide>
				))}
			{width >= 1666 &&
				width < 1966 &&
				mostViewedProductsGroupedBy5.map((mostViewedProductsGroup, id) => (
					<swiper-slide key={id}>
						<div className="flex flex-row gap-x-[3rem]">
							{mostViewedProductsGroup.map((mostViewedProduct: any, id: number) => (
								<Card3dFlip
									key={id}
									data={mostViewedProduct}
									className={styles.sliderSlide}
								>
									<ProductCard
										data={mostViewedProduct}
										cardType="advanced"
										className={styles.sliderSlide}
										backgroundImageClassName={styles.sliderSlideBackgroundImage}
									/>
								</Card3dFlip>
							))}
						</div>
					</swiper-slide>
				))}
			{width >= 1966 &&
				mostViewedProductsGroupedBy6.map((mostViewedProductsGroup, id) => (
					<swiper-slide key={id}>
						<div className="flex flex-row gap-x-[3rem]">
							{mostViewedProductsGroup.map((mostViewedProduct: any, id: number) => (
								<Card3dFlip
									key={id}
									data={mostViewedProduct}
									className={styles.sliderSlide}
								>
									<ProductCard
										data={mostViewedProduct}
										cardType="advanced"
										className={styles.sliderSlide}
										backgroundImageClassName={styles.sliderSlideBackgroundImage}
									/>
								</Card3dFlip>
							))}
						</div>
					</swiper-slide>
				))}
		</swiper-container>
	);
};

export default DesktopSlider;
