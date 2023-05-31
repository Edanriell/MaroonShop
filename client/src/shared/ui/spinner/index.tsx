import { ReactComponent as SpinnerSvg } from "./assets/spinner.svg";
import { SpinnerProps } from "./types";

const Spinner = ({ width, height, color }: SpinnerProps) => {
	return (
		<>
			<SpinnerSvg className={`w-[${width}] h-[${height}] text-${color}`} />
		</>
	);
};

export default Spinner;
