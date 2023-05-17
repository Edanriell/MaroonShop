import { useState, useEffect } from "react";

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
