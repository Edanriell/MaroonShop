import { MutableRefObject } from "react";

import { Link } from "react-router-dom";

import styles from "./styles.module.scss";

type Props = {
	text: string;
	commonButtonClasses: string;
	handleButtonMouseEnter: () => void;
	handleButtonMouseLeave: () => void;
	buttonRef: MutableRefObject<null>;
	buttonBoxRef: MutableRefObject<null>;
	buttonTextRef: MutableRefObject<null>;
	linkInternal: string;
	classes: string;
};

const LinkInternal = ({
	text,
	commonButtonClasses,
	handleButtonMouseEnter,
	handleButtonMouseLeave,
	buttonRef,
	buttonBoxRef,
	buttonTextRef,
	linkInternal,
	classes,
}: Props) => {
	return (
		<div className="relative z-10">
			<Link
				to={linkInternal}
				className={commonButtonClasses + " " + classes}
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
