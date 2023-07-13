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
	splitterColor = "",
	contentWithinSplitter = false,
	triggerNameClasses = "",
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
						"relative flex flex-col items-center " +
						"cursor-pointer after:content-[''] " +
						"mb-[1.2rem]"
					}
				>
					<div className={"flex flex-row items-center justify-between w-full"}>
						<span
							className={
								"font-medium font-mPlus text-sm-18px text-blue-zodiac-950 " +
								triggerNameClasses
							}
						>
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
					</div>
					{isAccordionContentShown && contentWithinSplitter && (
						<div
							ref={accordionContentRef}
							className={
								"overflow-hidden pt-[0.4rem] pb-[0.2rem] " + accordionContentClasses
							}
						>
							{children}
						</div>
					)}
					<div
						className={
							"w-full h-[0.1rem] bg-iron-200 bloc mt-[1.2rem] " + splitterColor
						}
					></div>
				</legend>
			)}
			{triggerType === "div" && (
				<div
					onClick={handleContentToggle}
					className={
						"relative flex flex-col items-center " +
						"cursor-pointer after:content-[''] " +
						"mb-[1.2rem]"
					}
				>
					<div className={"flex flex-row items-center justify-between w-full"}>
						<span
							className={
								"font-medium font-mPlus text-sm-18px text-blue-zodiac-950 " +
								triggerNameClasses
							}
						>
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
					</div>
					{isAccordionContentShown && contentWithinSplitter && (
						<div
							ref={accordionContentRef}
							className={
								"overflow-hidden pt-[0.4rem] pb-[0.2rem] " + accordionContentClasses
							}
						>
							{children}
						</div>
					)}
					<div
						className={
							"w-full h-[0.1rem] bg-iron-200 bloc mt-[1.2rem] " + splitterColor
						}
					></div>
				</div>
			)}
			{isAccordionContentShown && !contentWithinSplitter && (
				<div
					ref={accordionContentRef}
					className={"overflow-hidden pt-[0.4rem] " + accordionContentClasses}
				>
					{children}
				</div>
			)}
		</div>
	);
};

export default Accordion;
