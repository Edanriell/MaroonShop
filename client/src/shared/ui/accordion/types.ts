import { ReactNode } from "react";

export type AccordionTriggerTypes = "div" | "legend";

export type AccordionProps = {
	className?: string;
	accordionContentClasses?: string;
	triggerName: string;
	triggerType: AccordionTriggerTypes;
	children: ReactNode;
};
