import { MutableRefObject } from "react";

export type FiltersCloseButtonProps = {
	isFiltersShown: boolean;
	closeFilterButtonRef: MutableRefObject<HTMLDivElement | null>;
	onFilterButtonClick: () => void;
	isFiltersCloseButtonLocked: boolean;
};
