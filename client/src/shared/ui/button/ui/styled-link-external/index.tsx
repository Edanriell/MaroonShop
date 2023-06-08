import { FC } from "react";

import { LinkExternalProps } from "./types";

import styles from "./styles.module.scss";

const LinkExternal: FC<LinkExternalProps> = ({
	text,
	commonButtonClasses,
	handleButtonMouseEnter,
	handleButtonMouseLeave,
	buttonRef,
	buttonBoxRef,
	buttonTextRef,
	linkExternal,
	classes,
}) => {
	return (
		<div className={"relative z-10"}>
			<a
				href={`${linkExternal}`}
				target="_blank"
				rel="noreferrer"
				className={commonButtonClasses + " " + classes}
				onMouseEnter={handleButtonMouseEnter}
				onMouseLeave={handleButtonMouseLeave}
				ref={buttonRef}
			>
				<div className={styles.buttonBox} ref={buttonBoxRef}></div>
				<span className={"relative z-10 block"} ref={buttonTextRef}>
					{text}
				</span>
			</a>
		</div>
	);
};

export default LinkExternal;
