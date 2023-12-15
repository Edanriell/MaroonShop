import { FC } from "react";

import { ProductsCartProps } from "./types";

// Cart Feature

const ShopContacts: FC<ProductsCartProps> = ({ title }) => {
	return (
		<div
			className={
				"pl-[1.5rem] pr-[1.5rem] md:pr-[4.5rem] md:pl-[4.5rem] relative " +
				"pt-[10vh] pb-[20vh]"
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
							"z-[14] md:pl-[0rem] mb-[4rem]"
						}
					>
						{title}
					</h2>
				</div>
			</div>
		</div>
	);
};

export default ShopContacts;
