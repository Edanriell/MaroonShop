import { useScreenSize } from "shared/lib/hooks";

import { MobileSlider, TabletSlider } from "./ui";

declare global {
	namespace JSX {
		interface IntrinsicElements {
			"swiper-container": any;
			"swiper-slide": any;
			"swiper-controls": any;
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
		return <MobileSlider bestSellers={bestSellers} classes={classes} />;
	} else if (width >= 768) {
		return <TabletSlider bestSellers={bestSellers} classes={classes} />;
	}
	return <div></div>;
};

export default BestsellersSlider;
