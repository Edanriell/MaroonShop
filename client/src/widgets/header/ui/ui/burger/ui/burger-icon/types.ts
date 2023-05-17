import { FunctionComponent, SVGProps, MutableRefObject } from "react";

export type BurgerBars = Array<{
	Bar: FunctionComponent<SVGProps<SVGSVGElement>>;
	classes: string;
	ref: MutableRefObject<null>;
	id: string;
}>;

export type BurgerIconProps = {
	firstBurgerBarRef: MutableRefObject<null>;
	secondBurgerBarRef: MutableRefObject<null>;
	thirdBurgerBarRef: MutableRefObject<null>;
	fourthBurgerBarRef: MutableRefObject<null>;
};
