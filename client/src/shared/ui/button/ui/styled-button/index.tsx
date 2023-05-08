import { MutableRefObject } from "react";

import styles from "./styles.module.scss";

type Props = {
	text: string;
	buttonClasses: string;
	handleButtonMouseEnter: () => void;
	handleButtonMouseLeave: () => void;
	buttonRef: MutableRefObject<null>;
	buttonBoxRef: MutableRefObject<null>;
	buttonTextRef: MutableRefObject<null>;
};

const Button = ({
	text,
	buttonClasses,
	handleButtonMouseEnter,
	handleButtonMouseLeave,
	buttonRef,
	buttonBoxRef,
	buttonTextRef,
}: Props) => {
	return (
		<div className="relative z-10">
			<button
				className={buttonClasses}
				onMouseEnter={handleButtonMouseEnter}
				onMouseLeave={handleButtonMouseLeave}
				ref={buttonRef}
			>
				<div className={styles.buttonBox} ref={buttonBoxRef}></div>
				<span className="relative z-10 block" ref={buttonTextRef}>
					{text}
				</span>
			</button>
		</div>
	);
};

export default Button;
