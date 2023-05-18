import { useRef } from "react";

import { mouseMoveEffect, mouseOutEffect } from "./model";
import { Card3dProps } from "./types";
import styles from "./styles.module.scss";

const Card3d = ({ children, classes, highlight = true }: Card3dProps) => {
	const cardHighlightRef = useRef(null);
	const cardContentRef = useRef(null);

	function handleCardMouseMove(event: any) {
		mouseMoveEffect({
			event,
			cardContentRef,
			cardHighlightRef,
		});
	}

	function handleCardMouseOut() {
		mouseOutEffect({
			cardContentRef,
			cardHighlightRef,
		});
	}

	return (
		<div
			onMouseMove={(event) => handleCardMouseMove(event)}
			onMouseOut={handleCardMouseOut}
			className={styles.card3d + " " + classes}
		>
			<div ref={cardContentRef}>
				{highlight && <div className={styles.cardHighlight} ref={cardHighlightRef}></div>}
				{children}
			</div>
		</div>
	);
};

export default Card3d;
