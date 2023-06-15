import { FC, useState, useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";

import { displayAccordionContent, hideAccordionContent } from "./model";

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

	const [accordionContentCtx] = useState(gsap.context(() => {}, accordionContentRef));

	useLayoutEffect(() => {
		if (accordionContentRef.current) displayAccordionContent(accordionContentRef);

		accordionContentCtx.add("remove", () => {
			hideAccordionContent(accordionContentRef, () => setIsAccordionContentShown(false));
		});

		return () => {
			accordionContentCtx.revert();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAccordionContentShown, accordionContentCtx]);

	function handleTriggerClick() {
		isAccordionContentShown ? accordionContentCtx.remove() : setIsAccordionContentShown(true);
	}

	return (
		<div className={className}>
			{triggerType === "legend" && (
				<legend
					onClick={handleTriggerClick}
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
					{!isAccordionContentShown && (
						<div
							className={
								"w-[1.4rem] h-[1.4rem] relative after:content-[''] after:w-[1.4rem] " +
								"after:h-[0.1rem] after:bg-blue-zodiac-950 after:block after:absolute " +
								"after:top-[50%] after:left-0 before:content-[''] before:w-[1.4rem] " +
								"before:h-[0.01rem] before:bg-blue-zodiac-950 before:block before:absolute " +
								"before:top-[50%] before:left-0 before:rotate-90"
							}
						></div>
					)}
					{isAccordionContentShown && (
						<div
							className={
								"w-[1.4rem] h-[1.4rem] relative after:content-[''] after:w-[1.4rem] " +
								"after:h-[0.1rem] after:bg-blue-zodiac-950 after:block after:absolute " +
								"after:top-[50%] after:left-0"
							}
						></div>
					)}
				</legend>
			)}
			{triggerType === "div" && (
				<div
					onClick={handleTriggerClick}
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
					{!isAccordionContentShown && (
						<div
							className={
								"w-[1.4rem] h-[1.4rem] relative after:content-[''] after:w-[1.4rem] " +
								"after:h-[0.1rem] after:bg-blue-zodiac-950 after:block after:absolute " +
								"after:top-[50%] after:left-0 before:content-[''] before:w-[1.4rem] " +
								"before:h-[0.01rem] before:bg-blue-zodiac-950 before:block before:absolute " +
								"before:top-[50%] before:left-0 before:rotate-90"
							}
						></div>
					)}
					{isAccordionContentShown && (
						<div
							className={
								"w-[1.4rem] h-[1.4rem] relative after:content-[''] after:w-[1.4rem] " +
								"after:h-[0.1rem] after:bg-blue-zodiac-950 after:block after:absolute " +
								"after:top-[50%] after:left-0"
							}
						></div>
					)}
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
