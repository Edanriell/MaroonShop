import { useScreenSize } from "shared/lib/hooks";

import { MobileSlider, TabletSlider, DesktopSlider } from "./ui";

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

	if (width >= 768 && width < 1366)
		return <TabletSlider bestSellers={bestSellers} classes={classes} />;

	if (width >= 1366) return <DesktopSlider bestSellers={bestSellers} classes={classes} />;

	return <MobileSlider bestSellers={bestSellers} classes={classes} />;
};

export default BestsellersSlider;
