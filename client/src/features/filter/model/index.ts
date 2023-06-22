import { MutableRefObject } from "react";

import { gsap } from "gsap";

import { Filters } from "../types";

export enum FilterCategory {
	"main-category" = "main-category",
	"secondary-category" = "secondary-category",
	"skin-type-category" = "skin-type-category",
}

class FiltersInitializer {
	private initialFilters: Filters = {
		filters: {
			[FilterCategory["main-category"]]: null,
			[FilterCategory["secondary-category"]]: null,
			[FilterCategory["skin-type-category"]]: null,
		},
	};

	public getInitialFilters(): Filters {
		return { ...this.initialFilters };
	}

	public addFilter(category: FilterCategory): void {
		if (this.initialFilters.filters[category]) return;
		this.initialFilters.filters[category] = null;
	}
}

const filtersInitializer = new FiltersInitializer();
export const initialFilters = filtersInitializer.getInitialFilters();

export function addSelectedFilter({
	prevFilters,
	selectedFilter,
	category,
}: {
	prevFilters: Filters;
	selectedFilter: string;
	category: FilterCategory;
}) {
	const updatedFilters = { ...prevFilters.filters };

	if (updatedFilters[category] === null) {
		updatedFilters[category] = [selectedFilter];
	} else if (Array.isArray(updatedFilters[category])) {
		if (!updatedFilters[category]?.includes(selectedFilter)) {
			updatedFilters[category]?.push(selectedFilter);
		}
	}

	return {
		...prevFilters,
		filters: updatedFilters,
	};
}

export function removeUnselectedFilter({
	prevFilters,
	selectedFilter,
	category,
}: {
	prevFilters: Filters;
	selectedFilter: string;
	category: FilterCategory;
}) {
	const updatedFilters = { ...prevFilters.filters };

	if (Array.isArray(updatedFilters[category])) {
		updatedFilters[category] = (updatedFilters[category] as Array<string>).filter(
			(filter) => filter !== selectedFilter,
		);

		if (updatedFilters[category]?.length === 0) {
			updatedFilters[category] = null;
		}
	}

	return {
		...prevFilters,
		filters: updatedFilters,
	};
}

export const displayFilter = (filterRef: MutableRefObject<HTMLFormElement | null>): void => {
	gsap.fromTo(
		filterRef.current,
		{
			opacity: 0,
			translateY: 15,
		},
		{
			opacity: 1,
			translateY: 0,
			duration: 0.5,
			ease: "power2.out",
		},
	);
};

export const hideFilter = (
	filterRef: MutableRefObject<HTMLFormElement | null>,
	closeFilter: () => void,
): void => {
	gsap.fromTo(
		filterRef.current,
		{
			opacity: 1,
			translateY: 0,
		},
		{
			opacity: 0,
			translateY: 15,
			duration: 0.25,
			ease: "power2.out",
			onComplete: () => {
				closeFilter();
			},
		},
	);
};

export const displayOpenFilterButton = (
	openFilterButtonRef: MutableRefObject<HTMLDivElement | null>,
): void => {
	gsap.fromTo(
		openFilterButtonRef.current,
		{
			opacity: 0,
			scale: 0.6,
		},
		{
			opacity: 1,
			scale: 1,
			duration: 0.5,
			ease: "power2.out",
		},
	);
};

export const hideOpenFilterButton = (
	openFilterButtonRef: MutableRefObject<HTMLDivElement | null>,
	showFilter: () => void,
): void => {
	gsap.fromTo(
		openFilterButtonRef.current,
		{
			opacity: 1,
			scale: 1,
		},
		{
			opacity: 0,
			scale: 0.6,
			duration: 0.25,
			ease: "power2.out",
			onComplete: () => showFilter(),
		},
	);
};

export const displayCloseFilterButton = (
	closeFilterButtonRef: MutableRefObject<HTMLDivElement | null>,
): void => {
	gsap.fromTo(
		closeFilterButtonRef.current,
		{
			opacity: 0,
			scale: 0.6,
		},
		{
			opacity: 1,
			scale: 1,
			duration: 0.5,
			ease: "power2.out",
		},
	);
};

export const hideCloseFilterButton = (
	closeFilterButtonRef: MutableRefObject<HTMLDivElement | null>,
): void => {
	gsap.fromTo(
		closeFilterButtonRef.current,
		{
			opacity: 1,
			scale: 1,
		},
		{
			opacity: 0,
			scale: 0.6,
			duration: 0.25,
			ease: "power2.out",
		},
	);
};
