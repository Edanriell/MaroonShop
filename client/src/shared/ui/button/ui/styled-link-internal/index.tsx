import { FC } from "react";
import { Link } from "react-router-dom";

import { LinkInternalProps } from "./types";

import styles from "./styles.module.scss";

const LinkInternal: FC<LinkInternalProps> = ({
	text,
	commonButtonClasses,
	handleButtonMouseEnter,
	handleButtonMouseLeave,
	buttonRef,
	buttonBoxRef,
	buttonTextRef,
	linkInternal,
	classes,
}) => {
	return (
		<div className={"relative z-10"}>
			<Link
				to={linkInternal}
				className={commonButtonClasses + " " + classes}
				onMouseEnter={handleButtonMouseEnter}
				onMouseLeave={handleButtonMouseLeave}
				ref={buttonRef}
			>
				<div className={styles.buttonBox} ref={buttonBoxRef}></div>
				<span className={"relative z-10 block"} ref={buttonTextRef}>
					{text}
				</span>
			</Link>
		</div>
	);
};

export default LinkInternal;
