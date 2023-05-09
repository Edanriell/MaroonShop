import { useScreenSize } from "shared/lib/hooks";

import { MobileSlider, UniversalSlider } from "./ui";

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

	if (width >= 768) return <UniversalSlider bestSellers={bestSellers} classes={classes} />;

	return <MobileSlider bestSellers={bestSellers} classes={classes} />;
};

export default BestsellersSlider;
