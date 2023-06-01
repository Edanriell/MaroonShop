import { ReactComponent as SpinnerSvg } from "./assets/spinner.svg";
import { SpinnerProps } from "./types";

const Spinner = ({ width, height, color, classes }: SpinnerProps) => {
	return (
		<>
			<SpinnerSvg className={`w-[${width}] h-[${height}] text-${color} ` + classes} />
		</>
	);
};

export default Spinner;
