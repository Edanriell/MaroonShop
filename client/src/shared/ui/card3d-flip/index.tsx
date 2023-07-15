import { FC } from "react";

import { Button } from "shared/ui";

import { Card3dFlipProps } from "./types";

import styles from "./styles.module.scss";

const Card3dFlip: FC<Card3dFlipProps> = ({ children, data }) => {
	return (
		<div className={styles.productCard}>
			<div className={styles.productCardFront}>
				<div className={styles.productCardInner + " " + styles.productCardInnerFront}>
					{children}
				</div>
			</div>
			<div className={styles.productCardBack}>
				<div
					className={
						styles.productCardInner +
						" " +
						styles.productCardInnerBack +
						" " +
						"p-[2rem] gap-y-[2rem]"
					}
				>
					<strong
						className={"font-raleway text-sm-18px font-semibold text-blue-zodiac-950"}
					>
						{data.name}
					</strong>
					<p className={"font-raleway text-sm-14px font-normal text-blue-zodiac-950"}>
						{data.description[0].slice(0, 100).trim() + "..."}
					</p>
					<Button
						type={"link-internal"}
						text={"Подробнее"}
						linkInternal={`/product/${data.id}`}
						borderColor={"#122947"}
						backgroundColor={"#122947"}
						textColor={"#FFF"}
						className={styles.productCardButton}
					/>
				</div>
			</div>
		</div>
	);
};

export default Card3dFlip;
