import { register } from "swiper/element/bundle";

import { ProductCard } from "entities/product";

register();

type Props = {
	bestSellers: Array<import("shared/api").Product>;
	classes: string;
};

const MobileSlider = ({ bestSellers, classes }: Props) => (
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

export default MobileSlider;
