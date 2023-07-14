import { FC } from "react";

import { Button } from "shared/ui";

import { Card3dFlipProps } from "./types";

import styles from "./styles.module.scss";

const Card3dFlip: FC<Card3dFlipProps> = ({ children }) => {
	return (
		<div className={styles.productCard}>
			<div className={styles.productCardFront}>
				<div className={styles.productCardInner + " " + styles.productCardInnerFront}>
					{children}
				</div>
			</div>
			<div className={styles.productCardBack}>
				<div className={styles.productCardInner + " " + styles.productCardInnerBack}>
					<Button
						type={"link-internal"}
						text={"Подробнее"}
						linkInternal={"/"}
						borderColor={"#122947"}
						backgroundColor={"#122947"}
						textColor={"#FFF"}
					/>
				</div>
			</div>
		</div>
	);
};

export default Card3dFlip;
