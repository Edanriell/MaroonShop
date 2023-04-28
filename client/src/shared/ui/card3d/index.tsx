import { useRef, ReactNode } from "react";

import { mouseMoveEffect, mouseOutEffect } from "./model";

import styles from "./styles.module.scss";

type Props = {
	children: ReactNode;
	highlight?: boolean;
};

function Card3d({ children, highlight = true }: Props) {
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
			className={styles.card3d}
		>
			<div ref={cardContentRef}>
				{highlight && <div className={styles.cardHighlight} ref={cardHighlightRef}></div>}
				{children}
			</div>
		</div>
	);
}

export default Card3d;
