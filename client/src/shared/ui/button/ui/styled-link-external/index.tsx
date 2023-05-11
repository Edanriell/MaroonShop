import { MutableRefObject } from "react";

import styles from "./styles.module.scss";

type Props = {
	text: string;
	commonButtonClasses: string;
	handleButtonMouseEnter: () => void;
	handleButtonMouseLeave: () => void;
	buttonRef: MutableRefObject<null>;
	buttonBoxRef: MutableRefObject<null>;
	buttonTextRef: MutableRefObject<null>;
	linkExternal: string;
	classes: string;
};

const LinkExternal = ({
	text,
	commonButtonClasses,
	handleButtonMouseEnter,
	handleButtonMouseLeave,
	buttonRef,
	buttonBoxRef,
	buttonTextRef,
	linkExternal,
	classes,
}: Props) => {
	return (
		<div className="relative z-10">
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
				<span className="relative z-10 block" ref={buttonTextRef}>
					{text}
				</span>
			</a>
		</div>
	);
};

export default LinkExternal;
