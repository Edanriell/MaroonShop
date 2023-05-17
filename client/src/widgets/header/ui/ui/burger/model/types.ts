import { MutableRefObject, Dispatch, SetStateAction } from "react";

export type BurgerTransformParameters = {
	firstBurgerBarRef: MutableRefObject<null>;
	secondBurgerBarRef: MutableRefObject<null>;
	thirdBurgerBarRef: MutableRefObject<null>;
	fourthBurgerBarRef: MutableRefObject<null>;
	onBurgerTransition: Dispatch<SetStateAction<boolean>>;
};
