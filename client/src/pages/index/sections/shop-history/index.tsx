import { Button } from "shared/ui";

import styles from "./styles.module.scss";

const ShopHistory = () => {
	return (
		<div
			className={
				"pt-[5.4rem] pb-[6rem] pl-[2.7rem] pr-[2.7rem] " +
				"md:pt-[9.1rem] md:pb-[10rem] md:pl-[4.5rem] md:pr-[4.5rem] " +
				"lg:pt-[11.1rem] lg:pb-[12rem] lg:pr-[28.5rem] lg:pl-[28.5rem] " +
				styles.shopHistoryBackgroundImage
			}
		>
			<div className={"flex flex-col items-center"}>
				<blockquote
					className={
						"font-medium text-center font-raleway " +
						"text-sm-22px text-blue-zodiac-950 mb-[2.4rem] " +
						"md:mb-[4.1rem] md:text-md-31.7px " +
						"lg:text-lg-32px-lh-40px"
					}
				>
					“Мы стремимся сделать уход за кожей доступным и приятным ритуалом для всех, кто
					хочет заботиться о себе и своем теле”
				</blockquote>
				<Button type="link-internal" linkInternal="/shop-history" text="Наша история" />
			</div>
		</div>
	);
};

export default ShopHistory;
