import { FC } from "react";

import Filter from "features/filter";

import { CatalogProps } from "./types";

const Catalog: FC<CatalogProps> = ({ title }) => {
	return (
		<div className={"pt-[3rem] pb-[7rem] pl-[1.5rem] pr-[1.5rem]"}>
			<div className={"mb-[4rem] flex flex-row justify-between"}>
				<div className={"flex-shrink-0 flex-grow-0"}>
					<h2
						className={
							"font-raleway font-normal text-sm-28px text-left text-blue-zodiac-950"
						}
					>
						{title}
					</h2>
				</div>
				<div className={"flex-shrink-0 flex-grow-0"}>
					<Filter />
				</div>
			</div>
			<div>
				<p>Catalog Content</p>
			</div>
		</div>
	);
};

export default Catalog;
