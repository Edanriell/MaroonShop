import { register } from "swiper/element/bundle";

import { ProductCard } from "entities/product";

import { useScreenSize } from "shared/lib/hooks";

register();

declare global {
	namespace JSX {
		interface IntrinsicElements {
			"swiper-container": any;
			"swiper-slide": any;
		}
	}
}

type Props = {
	bestSellers: Array<import("shared/api").Product>;
	classes: string;
};

const BestsellersSlider = ({ bestSellers, classes }: Props) => {
	const { width } = useScreenSize();

	if (width < 768) {
		return (
			<swiper-container
				slides-per-view="1"
				keyboard="true"
				grab-cursor="true"
				speed="500"
				loop="true"
				autoplay-delay="6000"
				autoplay-pause-on-mouse-enter="true"
				class={classes}
			>
				{bestSellers.map((bestSeller, id) => (
					<swiper-slide key={id}>
						<ProductCard data={bestSeller} simplified />
					</swiper-slide>
				))}
			</swiper-container>
		);
	} else if (width >= 768) {
		return (
			<swiper-container
				slides-per-view="4"
				keyboard="true"
				grab-cursor="true"
				speed="500"
				loop="true"
				space-between="30"
				update-on-window-resize="true"
				width="1010"
				autoplay-delay="6000"
				autoplay-pause-on-mouse-enter="true"
				class={classes}
			>
				{bestSellers.map((bestSeller, id) => (
					<swiper-slide key={id}>
						<ProductCard data={bestSeller} simplified />
					</swiper-slide>
				))}
			</swiper-container>
		);
	}
	return <div></div>;
};

export default BestsellersSlider;
