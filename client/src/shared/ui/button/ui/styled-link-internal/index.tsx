import { MutableRefObject } from "react";

import { Link } from "react-router-dom";

import styles from "./styles.module.scss";

type Props = {
	text: string;
	buttonClasses: string;
	handleButtonMouseEnter: () => void;
	handleButtonMouseLeave: () => void;
	buttonRef: MutableRefObject<null>;
	buttonBoxRef: MutableRefObject<null>;
	buttonTextRef: MutableRefObject<null>;
	linkInternal: string;
};

const LinkInternal = ({
	text,
	buttonClasses,
	handleButtonMouseEnter,
	handleButtonMouseLeave,
	buttonRef,
	buttonBoxRef,
	buttonTextRef,
	linkInternal,
}: Props) => {
	return (
		<div className="relative z-10">
			<Link
				to={linkInternal}
				className={buttonClasses}
				onMouseEnter={handleButtonMouseEnter}
				onMouseLeave={handleButtonMouseLeave}
				ref={buttonRef}
			>
				<div className={styles.buttonBox} ref={buttonBoxRef}></div>
				<span className="relative z-10 block" ref={buttonTextRef}>
					{text}
				</span>
			</Link>
		</div>
	);
};

export default LinkInternal;
