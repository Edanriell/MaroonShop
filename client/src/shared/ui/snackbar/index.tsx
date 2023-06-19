import { useState, useEffect, useRef, useLayoutEffect, FC } from "react";
import { gsap } from "gsap";
import classNames from "classnames";

import { displaySnackbar, hideSnackbar } from "./model";

import { ReactComponent as Xmark } from "./assets/xmark-solid.svg";

import { SnackbarProps } from "./types";

import "./styles.scss";

const Snackbar: FC<SnackbarProps> = ({ type, message, autoCloseDuration }) => {
	const [displayed, setDisplayed] = useState<boolean>(false);
	const snackbarRef = useRef<HTMLDivElement | null>(null);

	const [snackbarCtx] = useState(gsap.context(() => {}, snackbarRef));

	useLayoutEffect(() => {
		if (!displayed) setDisplayed(true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useLayoutEffect(() => {
		if (snackbarRef.current && displayed) displaySnackbar(snackbarRef);

		snackbarCtx.add("hide", () => {
			hideSnackbar(snackbarRef, () => setDisplayed(false));
		});

		return () => {
			snackbarCtx.revert();
		};
	}, [displayed, snackbarCtx]);

	useEffect(() => {
		if (autoCloseDuration) {
			const timeout = setTimeout(() => {
				if (displayed) {
					snackbarCtx.hide();
				}
			}, +autoCloseDuration);

			return () => {
				clearTimeout(timeout);
			};
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [displayed]);

	function handleSnackbarClose() {
		snackbarCtx.hide();
	}

	const snackbarClasses = classNames({
		"bg-red-600": type === "error",
		"bg-orange-600": type === "warning",
		"bg-blue-600": type === "info",
		"bg-green-600": type === "success",
	});

	const secondaryCircleClasses = classNames({
		"text-red-600": type === "error",
		"text-orange-600": type === "warning",
		"text-blue-600": type === "info",
		"text-green-600": type === "success",
	});

	if (displayed) {
		return (
			<div
				ref={snackbarRef}
				className={
					snackbarClasses +
					" min-h-[6rem] min-w-[30rem] max-w-[38rem] flex flex-row " +
					"items-center p-[1rem] border-none " +
					"rounded-[0.2rem] snackbar-shadow justify-between"
				}
			>
				<p className={"font-medium text-white text-sm-14px font-raleway text-left"}>
					{message}
				</p>
				<div className={"w-[3rem] h-[3rem] relative ml-[4rem] flex-shrink-0 flex-grow-0"}>
					{autoCloseDuration && (
						<svg
							className={"relative z-20 w-full h-full pointer-events-none"}
							viewBox="-5 -5 110 110"
						>
							<path
								className={secondaryCircleClasses + " w-full h-full"}
								d="M 50,50 m 0,-47 a 47,47 0 1 1 0,94 a 47,47 0 1 1 0,-94"
								stroke="currentColor"
								strokeWidth="8"
								fillOpacity="0"
							></path>
							<path
								className={"w-full h-full text-white main-circle"}
								d="M 50,50 m 0,-47 a 47,47 0 1 1 0,94 a 47,47 0 1 1 0,-94"
								stroke="currentColor"
								strokeWidth="9"
								fillOpacity="0"
								style={{
									strokeDasharray: "296, 296",
									animationDuration: autoCloseDuration + "ms",
								}}
							></path>
						</svg>
					)}
					<button
						className={
							"w-[2.6rem] h-[2.6rem] absolute top-[50%] left-[50%] " +
							"translate-x-[-50%] translate-y-[-50%] rounded-[50%] " +
							"z-10 pointer-events-auto cursor-pointer hover:bg-[#00000033] " +
							"duration-500 ease-out transition-colors"
						}
						type="button"
						onClick={handleSnackbarClose}
					>
						<span className={"sr-only"}>Закрыть окно</span>
						<Xmark
							className={
								"w-[1.8rem] h-[1.8rem] absolute top-[50%] " +
								"left-[50%] translate-x-[-50%] translate-y-[-50%] " +
								"pointer-events-none text-white"
							}
						/>
					</button>
				</div>
			</div>
		);
	}

	return null;
};

export default Snackbar;
