import { FC } from "react";

import { useScreenSize } from "shared/lib/hooks";

import { MobileSlider, UniversalSlider } from "./ui";

import { BestsellersSliderProps } from "./types";

const BestsellersSlider: FC<BestsellersSliderProps> = ({ bestSellers, className = "" }) => {
	const { width } = useScreenSize();

	if (width >= 768) return <UniversalSlider bestSellers={bestSellers} className={className} />;

	return <MobileSlider bestSellers={bestSellers} className={className} />;
};

export default BestsellersSlider;
