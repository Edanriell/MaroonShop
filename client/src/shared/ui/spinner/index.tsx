import { FC } from "react";

import { ReactComponent as SpinnerSvg } from "./assets/spinner.svg";

import { SpinnerProps } from "./types";

const Spinner: FC<SpinnerProps> = ({ width, height, color, classes }) => {
	return (
		<>
			<SpinnerSvg className={`w-[${width}] h-[${height}] text-${color} ` + classes} />
		</>
	);
};

export default Spinner;
