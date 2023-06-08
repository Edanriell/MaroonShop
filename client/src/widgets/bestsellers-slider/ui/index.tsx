import { FC } from "react";

import { useScreenSize } from "shared/lib/hooks";

import { MobileSlider, UniversalSlider } from "./ui";

import { BestsellersSliderProps } from "./types";

const BestsellersSlider: FC<BestsellersSliderProps> = ({ bestSellers, classes = "" }) => {
	const { width } = useScreenSize();

	if (width >= 768) return <UniversalSlider bestSellers={bestSellers} classes={classes} />;

	return <MobileSlider bestSellers={bestSellers} classes={classes} />;
};

export default BestsellersSlider;
