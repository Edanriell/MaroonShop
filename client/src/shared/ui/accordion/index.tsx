// import { FC, useState, useRef, useLayoutEffect } from "react";
// import { gsap } from "gsap";
import { FC, useState, useRef } from "react";

// import { displayAccordionContent, hideAccordionContent } from "./model";

import { ReactComponent as Plus } from "./assets/plus.svg";
import { ReactComponent as Minus } from "./assets/minus.svg";

import { AccordionProps } from "./types";

const Accordion: FC<AccordionProps> = ({ triggerName, triggerType, children }) => {
	const [isAccordionContentShown, setIsAccordionContentShown] = useState<boolean>(true);

	const accordionContentRef = useRef<HTMLDivElement | null>(null);

	// const [accordionContentCtx] = useState(gsap.context(() => {}, accordionContentRef));

	// useLayoutEffect(() => {
	// 	if (accordionContentRef.current) displayAccordionContent(accordionContentRef);

	// 	accordionContentCtx.add("remove", () => {
	// 		hideAccordionContent(accordionContentRef, () => setIsAccordionContentShown(false));
	// 	});

	// 	return () => {
	// 		accordionContentCtx.revert();
	// 	};
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [isAccordionContentShown, accordionContentCtx]);

	function handleTriggerClick() {
		// isAccordionContentShown ? accordionContentCtx.remove() : setIsAccordionContentShown(true);
		setIsAccordionContentShown(true);
	}

	return (
		<div>
			{triggerType === "legend" && (
				<legend
					onClick={handleTriggerClick}
					className="flex flex-row items-center justify-between cursor-pointer"
				>
					<span className="font-medium font-mPlus text-sm-18px text-blue-zodiac-950">
						{triggerName}
					</span>
					{isAccordionContentShown && (
						<Plus className="w-[1.2rem] h-[1.2rem] text-blue-zodiac-950" />
					)}
					{!isAccordionContentShown && (
						<Minus className="w-[1.2rem] h-[0.1rem] text-blue-zodiac-950" />
					)}
				</legend>
			)}
			{triggerType === "div" && (
				<div
					onClick={handleTriggerClick}
					className="flex flex-row items-center justify-between cursor-pointer"
				>
					<span className="font-medium font-mPlus text-sm-18px text-blue-zodiac-950">
						{triggerName}
					</span>
					{isAccordionContentShown && (
						<Plus className="w-[1.2rem] h-[1.2rem] text-blue-zodiac-950" />
					)}
					{!isAccordionContentShown && (
						<Minus className="w-[1.2rem] h-[0.1rem] text-blue-zodiac-950" />
					)}
				</div>
			)}
			{isAccordionContentShown && (
				<div ref={accordionContentRef} className="overflow-hidden">
					{children}
				</div>
			)}
		</div>
	);
};

export default Accordion;
