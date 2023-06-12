import { FC } from "react";

import { LinkExternalProps } from "./types";

import styles from "./styles.module.scss";

const LinkExternal: FC<LinkExternalProps> = ({
	text,
	additionalClassNames,
	onButtonMouseEnter,
	onButtonMouseLeave,
	buttonRef,
	buttonBoxRef,
	buttonTextRef,
	linkExternal,
	className,
}) => {
	return (
		<div className={"relative z-10"}>
			<a
				href={`${linkExternal}`}
				target="_blank"
				rel="noreferrer"
				className={additionalClassNames + " " + className}
				onMouseEnter={onButtonMouseEnter}
				onMouseLeave={onButtonMouseLeave}
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
