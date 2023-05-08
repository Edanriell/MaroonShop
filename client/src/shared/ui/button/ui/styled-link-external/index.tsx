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
	linkExternal: string;
};

const LinkExternal = ({
	text,
	buttonClasses,
	handleButtonMouseEnter,
	handleButtonMouseLeave,
	buttonRef,
	buttonBoxRef,
	buttonTextRef,
	linkExternal,
}: Props) => {
	return (
		<div className="relative z-10">
			<Link
				to={{ pathname: linkExternal }}
				target="_blank"
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

export default LinkExternal;
