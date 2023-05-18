import { useScreenSize } from "shared/lib/hooks";
import { MobileSlider, UniversalSlider } from "./ui";
import { BestsellersSliderProps } from "./types";
declare global {
	namespace JSX {
		interface IntrinsicElements {
			"swiper-container": any;
			"swiper-slide": any;
		}
	}
}

const BestsellersSlider = ({ bestSellers, classes = "" }: BestsellersSliderProps) => {
	const { width } = useScreenSize();

	if (width >= 768) return <UniversalSlider bestSellers={bestSellers} classes={classes} />;

	return <MobileSlider bestSellers={bestSellers} classes={classes} />;
};

export default BestsellersSlider;
