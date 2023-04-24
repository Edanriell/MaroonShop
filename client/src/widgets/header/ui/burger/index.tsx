import {
	useState,
	useRef,
	useLayoutEffect,
	FunctionComponent,
	SVGProps,
	MutableRefObject,
} from "react";
import { gsap } from "gsap";

import {
	transformBurgerToCross,
	transformCrossToBurger,
	displayBurgerMenu,
	hideBurgerMenu,
} from "./model";

import { BurgerMenu } from "./ui";

import { ReactComponent as Bar } from "./assets/bar.svg";

type IsDisplayed = boolean;
type IsTransitioning = boolean;
type BurgerBars = Array<{
	Bar: FunctionComponent<SVGProps<SVGSVGElement>>;
	classes: string;
	ref: MutableRefObject<null>;
	id: string;
}>;

function Burger() {
	const burgerMenuRef = useRef(null);
	const firstBurgerBarRef = useRef(null);
	const secondBurgerBarRef = useRef(null);
	const thirdBurgerBarRef = useRef(null);
	const fourthBurgerBarRef = useRef(null);

	const [isDisplayed, setIsDisplayed] = useState<IsDisplayed>(false);
	const [isTransitioning, setIsTransitioning] = useState<IsTransitioning>(false);
	const [burgerMenuCtx] = useState(gsap.context(() => {}, burgerMenuRef));

	useLayoutEffect(() => {
		if (burgerMenuRef.current) {
			displayBurgerMenu(burgerMenuRef);
		}

		burgerMenuCtx.add("remove", () => {
			hideBurgerMenu(burgerMenuRef, setIsDisplayed);
		});

		return () => burgerMenuCtx.revert();
	}, [isDisplayed]);

	function handleBurgerClick() {
		if (!isDisplayed) {
			setIsDisplayed(true);
			transformBurgerToCross({
				firstBurgerBarRef,
				secondBurgerBarRef,
				thirdBurgerBarRef,
				fourthBurgerBarRef,
				onBurgerTransition: setIsTransitioning,
			});
		} else {
			burgerMenuCtx.remove();
			transformCrossToBurger({
				firstBurgerBarRef,
				secondBurgerBarRef,
				thirdBurgerBarRef,
				fourthBurgerBarRef,
				onBurgerTransition: setIsTransitioning,
			});
		}
	}

	const burgerBars: BurgerBars = [
		{
			Bar,
			classes:
				"dras w-[2.2rem] h-[0.2rem] text-blue-zodiac-950 md:w-[2.4rem] md:h-[0.3rem] duration-500 ease-out",
			ref: firstBurgerBarRef,
			id: "firstBurgerBar",
		},
		{
			Bar,
			classes:
				"w-[2.2rem] h-[0.2rem] text-blue-zodiac-950 md:w-[2.4rem] md:h-[0.3rem] duration-500 ease-out",
			ref: secondBurgerBarRef,
			id: "secondBurgerBar",
		},
		{
			Bar,
			classes:
				"w-[2.2rem] h-[0.2rem] text-blue-zodiac-950 md:w-[2.4rem] md:h-[0.3rem] duration-500 ease-out",
			ref: thirdBurgerBarRef,
			id: "thirdBurgerBar",
		},
		{
			Bar,
			classes:
				"w-[2.2rem] h-[0.2rem] text-blue-zodiac-950 md:w-[2.4rem] md:h-[0.3rem] absolute top-50 left-0 hidden duration-500 ease-out",
			ref: fourthBurgerBarRef,
			id: "fourthBurgerBar",
		},
	];

	return (
		<div>
			<button
				aria-label="burger menu"
				className={`
					flex flex-col items-center justify-center 
					cursor-pointer gap-y-[0.3rem] md:gap-y-[0.4rem] relative z-10
					burger-hover-effect
				`}
				type="button"
				disabled={isTransitioning}
				onClick={handleBurgerClick}
			>
				{burgerBars.map(({ Bar, classes, ref, id }) => (
					<Bar key={id} className={classes} ref={ref} />
				))}
			</button>
			{isDisplayed && (
				<div
					ref={burgerMenuRef}
					className="absolute top-0 left-0 w-full bg-desert-storm-50 shadow-burgerMenu box -z-10"
				>
					<BurgerMenu />
				</div>
			)}
		</div>
	);
}

export default Burger;
