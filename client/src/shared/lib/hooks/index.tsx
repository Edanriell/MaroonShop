import { useState, useEffect } from "react";

type ScreenSize = {
	width: number;
	height: number;
};

export const useScreenSize = () => {
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
