import { FC } from "react";
import { Link } from "react-router-dom";

import { LinkInternalProps } from "./types";

import styles from "./styles.module.scss";

const LinkInternal: FC<LinkInternalProps> = ({
	text,
	additionalClassNames,
	onButtonMouseEnter,
	onButtonMouseLeave,
	buttonRef,
	buttonBoxRef,
	buttonTextRef,
	linkInternal,
	className,
}) => {
	return (
		<div className={"relative z-10"}>
			<Link
				to={linkInternal}
				className={additionalClassNames + " " + className}
				onMouseEnter={onButtonMouseEnter}
				onMouseLeave={onButtonMouseLeave}
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
