import { useRef, useEffect } from "react";

import { Spinner } from "shared/ui";

import { displayElement } from "./model";

import { ReactComponent as Logo } from "./assets/logo.svg";

const LoadingPage = () => {
	const componentRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		displayElement(componentRef);
	}, []);

	return (
		<main ref={componentRef}>
			<div className={"flex flex-col items-center justify-center h-[100vh]"}>
				<Logo
					className={
						"text-blue-zodiac-950 h-auto mb-[2rem] " +
						"max-w-[26rem] min-w-[18rem] mr-[2rem] ml-[2rem]"
					}
				/>
				<Spinner
					width={"3rem"}
					height={"3rem"}
					color={"blue-zodiac-950"}
					classes={"w-[3.5rem] h-[3.5rem]"}
				/>
			</div>
		</main>
	);
};

export default LoadingPage;
