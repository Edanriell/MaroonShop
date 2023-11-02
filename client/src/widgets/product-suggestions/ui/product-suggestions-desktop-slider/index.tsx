import { FC, useEffect, useRef } from "react";
import { register } from "swiper/element/bundle";

import { ProductCard } from "entities/product";

import { useArrayGrouper } from "shared/lib/hooks";

import { Card3dFlip } from "shared/ui";

import arrowLeftSvg from "./assets/arrow-left.svg";
import arrowRightSvg from "./assets/arrow-right.svg";

import styles from "./styles.module.scss";

import { ProductSuggestionsDesktopSliderProps } from "./types";

register();

const ProductSuggestionsDesktopSlider: FC<ProductSuggestionsDesktopSliderProps> = ({
	mostViewedProducts,
}) => {
	const mostViewedProductsGroupedBy4 = useArrayGrouper(Object.values(mostViewedProducts), 4);

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
                        left: 108.5rem;
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
                        right: 0.8rem;
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

					@media only screen and (min-width: 1386px) {
						.swiper-button-next {
							right: 0.2rem;
						}
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
			{mostViewedProductsGroupedBy4.map((mostViewedProductsGroup, id) => (
				<swiper-slide key={id}>
					<div
						className={
							"grid grid-cols-[26.5rem_26.5rem_26.5rem_26.5rem] gap-x-[3rem] justify-center " +
							"min-[1386px]:grid-cols-[27rem_27rem_27rem_27rem] "
						}
					>
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

export default ProductSuggestionsDesktopSlider;
