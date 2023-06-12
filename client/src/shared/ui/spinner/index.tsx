import { FC } from "react";

import { ReactComponent as SpinnerSvg } from "./assets/spinner.svg";

import { SpinnerProps } from "./types";

const Spinner: FC<SpinnerProps> = ({ width, height, color, className }) => {
	return (
		<>
			<SpinnerSvg className={`w-[${width}] h-[${height}] text-${color} ` + className} />
		</>
	);
};

export default Spinner;
