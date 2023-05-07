import { register } from "swiper/element/bundle";

import { ProductCard } from "entities/product";

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
};

const BestsellersSlider = ({ bestSellers }: Props) => {
	return (
		<swiper-container
			slides-per-view="1"
			keyboard="true"
			grab-cursor="true"
			speed="500"
			loop="true"
			autoplay-delay="6000"
			autoplay-pause-on-mouse-enter="true"
		>
			{bestSellers.map((bestSeller, id) => (
				<swiper-slide key={id}>
					<ProductCard data={bestSeller} simplified />
				</swiper-slide>
			))}
		</swiper-container>
	);
};

export default BestsellersSlider;
