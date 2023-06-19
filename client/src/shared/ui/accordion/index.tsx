import { FC, useState, useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";

import {
	displayAccordionContent,
	hideAccordionContent,
	transformPlusToMinus,
	transformMinusToPlus,
} from "./model";

import { AccordionProps } from "./types";

const Accordion: FC<AccordionProps> = ({
	className,
	accordionContentClasses,
	triggerName,
	triggerType,
	children,
}) => {
	const [isAccordionContentShown, setIsAccordionContentShown] = useState<boolean>(false);

	const accordionContentRef = useRef<HTMLDivElement | null>(null);
	const plusIconBar1Ref = useRef<HTMLDivElement | null>(null);
	const plusIconBar2Ref = useRef<HTMLDivElement | null>(null);

	const [accordionContentCtx] = useState(gsap.context(() => {}, accordionContentRef));

	useLayoutEffect(() => {
		if (accordionContentRef.current) displayAccordionContent(accordionContentRef);

		accordionContentCtx.add("hide", () => {
			hideAccordionContent(accordionContentRef, () => setIsAccordionContentShown(false));
		});

		return () => {
			accordionContentCtx.revert();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAccordionContentShown, accordionContentCtx]);

	function handleContentToggle() {
		if (isAccordionContentShown) {
			transformMinusToPlus(plusIconBar1Ref, plusIconBar2Ref);
			accordionContentCtx.hide();
		} else {
			transformPlusToMinus(plusIconBar1Ref, plusIconBar2Ref);
			setIsAccordionContentShown(true);
		}
	}

	return (
		<div className={className}>
			{triggerType === "legend" && (
				<legend
					onClick={handleContentToggle}
					className={
						"relative flex flex-row items-center justify-between " +
						"cursor-pointer after:content-[''] after:w-full after:h-[0.1rem] " +
						"after:bg-iron-200 after:absolute after:left-0 after:bottom-0 " +
						"after:block pb-[1.2rem] mb-[1.3rem]"
					}
				>
					<span className={"font-medium font-mPlus text-sm-18px text-blue-zodiac-950"}>
						{triggerName}
					</span>
					<div className={"w-[1.2rem] h-[1.2rem] relative"}>
						<div
							ref={plusIconBar1Ref}
							className={
								"w-[1.2rem] h-[0.1rem] bg-blue-zodiac-950 block " +
								"top-[50%] left-0 absolute"
							}
						></div>
						<div
							ref={plusIconBar2Ref}
							className={
								"w-[1.2rem] h-[0.01rem] bg-blue-zodiac-950 block " +
								"absolute top-[50%] left-0 rotate-90"
							}
						></div>
					</div>
				</legend>
			)}
			{triggerType === "div" && (
				<div
					onClick={handleContentToggle}
					className={
						"relative flex flex-row items-center justify-between " +
						"cursor-pointer after:content-[''] after:w-full after:h-[0.1rem] " +
						"after:bg-iron-200 after:absolute after:left-0 after:bottom-0 " +
						"after:block pb-[1.2rem] mb-[1.3rem]"
					}
				>
					<span className={"font-medium font-mPlus text-sm-18px text-blue-zodiac-950"}>
						{triggerName}
					</span>
					<div className={"w-[1.2rem] h-[1.2rem] relative"}>
						<div
							className={
								"w-[1.2rem] h-[0.1rem] bg-blue-zodiac-950 block " +
								"top-[50%] left-0 absolute"
							}
						></div>
						<div
							className={
								"w-[1.2rem] h-[0.01rem] bg-blue-zodiac-950 block " +
								"absolute top-[50%] left-0 rotate-90"
							}
						></div>
					</div>
				</div>
			)}
			{isAccordionContentShown && (
				<div
					ref={accordionContentRef}
					className={accordionContentClasses + " overflow-hidden pt-[0.3rem]"}
				>
					{children}
				</div>
			)}
		</div>
	);
};

export default Accordion;
