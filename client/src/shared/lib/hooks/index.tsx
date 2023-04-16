import { useState, useEffect } from "react";
// importing useState and useEffect hooks.

type ScreenSize = {
	width: number;
	height: number;
};
// Created a useState type.

function useScreenSize() {
	const [screenSize, setScreenSize] = useState<ScreenSize>({
		width: 0,
		height: 0,
	});
	// Creating state, setting state defaults to 0.

	useEffect(() => {
		window.addEventListener("resize", handleScreenResize);
		// Hooking up event listener, passing two arguments "resize" and function handleScreenResize.

		handleScreenResize();
		// Executing function once.

		return () => window.removeEventListener("resize", handleScreenResize);
		// Removing event listener on cleanup.
	}, []);
	// Use effect hook, will run only once at component mount.

	function handleScreenResize() {
		setScreenSize({
			width: window.innerWidth,
			height: window.innerHeight,
		});
	}
	// handleScreenResize function, changes the state.

	return screenSize;
}
// Custom useScreenSize hook.

export { useScreenSize };
// Exporting custom hook.
