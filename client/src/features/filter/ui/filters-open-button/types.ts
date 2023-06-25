import { MutableRefObject } from "react";

export type FiltersOpenButtonProps = {
	isFiltersShown: boolean;
	openFilterButtonRef: MutableRefObject<HTMLDivElement | null>;
	onFilterButtonClick: () => void;
	className: string;
	isFiltersOpenButtonLocked: boolean;
};
