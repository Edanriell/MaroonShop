import { Button } from "shared/ui";

import style from "./styles.module.scss";

const NewCollection = () => {
	return (
		<div
			className={
				style.newCollectionBackgroundImage +
				" " +
				"pt-[28.8rem] pb-[6rem] md:pt-[8.8rem] md:pb-[9.7rem] lg:pt-[7.2rem] lg:pb-[8.1rem]"
			}
		>
			<div
				className={
					"pl-[1.5rem] pr-[1.5rem] md:pl-[4.5rem] md:pr-[4.5rem] " +
					"lg:pl-[9.8rem] lg:pr-[9.8rem]"
				}
			>
				<div
					className={
						"grid grid-cols-new-collection-three-sm md:grid-cols-new-collection-three-md " +
						"lg:grid-cols-new-collection-three-lg grid-rows-3-auto justify-items-center " +
						"md:justify-items-start"
					}
				>
					<b
						className={
							"font-medium font-raleway text-sm-28px-lh-35px text-blue-zodiac-950 " +
							"mb-[1.15rem] text-center md:text-left md:text-md-32px md:mb-[1.4rem] " +
							"col-start-2 col-end-3"
						}
					>
						Встречайте весну вместе с нами
					</b>
					<p
						className={
							"font-normal font-mPlus text-sm-16px text-blue-zodiac-950 " +
							"mb-[2.45rem] text-center md:text-left md:text-md-18px " +
							"md:mb-[3.3rem] col-start-2 col-end-3"
						}
					>
						Попробуйте новую коллекцию ухаживающих средств для лица с SPF защитой
					</p>
					<div className={"col-start-2 col-end-3"}>
						<Button type="link-internal" text="Подробнее" linkInternal="/" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default NewCollection;
