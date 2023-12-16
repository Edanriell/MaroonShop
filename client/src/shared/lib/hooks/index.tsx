import { useState, useEffect, useLayoutEffect } from "react";

import { ScreenSize, ScrollPosition } from "./types";

export const useScreenSize = (): ScreenSize => {
	const [screenSize, setScreenSize] = useState<ScreenSize>({
		width: 0,
		height: 0,
	});

	useEffect(() => {
		window.addEventListener("resize", handleScreenResize);

		handleScreenResize();

		return () => window.removeEventListener("resize", handleScreenResize);
	}, []);

	function handleScreenResize() {
		setScreenSize({
			width: window.innerWidth,
			height: window.innerHeight,
		});
	}

	return screenSize;
};

export const useScrollPosition = (): ScrollPosition => {
	const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
		scrollPosition: 0,
	});

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);

		handleScroll();

		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	function handleScroll() {
		setScrollPosition({
			scrollPosition: window.scrollY,
		});
	}

	return scrollPosition;
};

export const useDebounce = (value: any, delay: number) => {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(timeout);
		};
	}, [value, delay]);

	return [debouncedValue];
};

export const useControlScrollbar = () => {
	useLayoutEffect(() => {
		const scrollbarWidth = window.innerWidth - document.body.offsetWidth;
		document.body.style.overflowY = "hidden";
		document.body.style.paddingRight = `${scrollbarWidth}px`;
		return () => {
			document.body.style.overflowY = "initial";
			document.body.style.paddingRight = "0px";
		};
	}, []);
};

export const useSplitArray = (originalArray: Array<any>, splitCount: number) => {
	const [splitArrays, setSplitArrays] = useState<Array<any>>([]);

	const splitArray = () => {
		const arrayLength = originalArray.length;
		const splitSize = Math.ceil(arrayLength / splitCount);

		const newArray = [];
		for (let i = 0; i < arrayLength; i += splitSize) {
			newArray.push(originalArray.slice(i, i + splitSize));
		}

		setSplitArrays(newArray);
	};

	return { splitArrays, splitArray };
};

export const useArrayGrouper = (oldArray: Array<any>, groupSize: number) => {
	if (!Array.isArray(oldArray) || !Number.isInteger(groupSize) || groupSize < 1) {
		return [];
	}

	const groupedArray = [];

	for (let i = 0; i < oldArray.length; i += groupSize) {
		groupedArray.push(oldArray.slice(i, i + groupSize));
	}

	return groupedArray;
};
