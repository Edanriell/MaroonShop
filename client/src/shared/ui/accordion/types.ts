import { ReactNode } from "react";

export type AccordionTriggerTypes = "div" | "legend";

export type AccordionProps = {
	triggerName: string;
	triggerType: AccordionTriggerTypes;
	children: ReactNode;
};
