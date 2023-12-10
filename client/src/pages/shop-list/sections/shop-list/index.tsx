import { FC } from "react";

import { ShopListProps } from "./types";

const ShopList: FC<ShopListProps> = ({ title }) => {
	return (
		<div
			className={
				"pl-[1.5rem] pr-[1.5rem] pt-[3rem] pb-[7rem] md:pr-[4.5rem] " +
				"md:pl-[4.5rem] md:pt-[3.6rem] md:pb-[11rem] " +
				"relative lg:pt-[3.7rem] lg:pb-[13rem]"
			}
		>
			<div
				className={"lg:pr-[2.3rem] lg:pl-[2.3rem] lg:mr-auto lg:ml-auto lg:max-w-[120rem]"}
			>
				<div
					className={
						"mb-[4rem] flex flex-col items-center justify-between md:mb-[3.6rem] lg:mb-[4.9rem]"
					}
				>
					<h2
						className={
							"font-raleway font-normal text-sm-28px text-left text-blue-zodiac-950 " +
							"md:text-md-36px justify-self-start row-start-1 row-end-2 pl-[1.5rem] " +
							"z-[14] md:pl-[0rem] mt-[10rem]"
						}
					>
						{title}
					</h2>
				</div>
			</div>
		</div>
	);
};

export default ShopList;
