import { FC } from "react";
import { v4 as uuidv4 } from "uuid";

import ShopHistory from "./shop-history";

import { ShopHistoryPageSections, SectionWrapperProps } from "./types";

const sections: ShopHistoryPageSections = [
	{
		id: uuidv4(),
		Section: ShopHistory,
		title: "История Maroon",
		classes: "bg-desert-storm-50",
	},
];

const SectionWrapper: FC<SectionWrapperProps> = ({ srTitle, children, classes }) => (
	<section className={classes}>
		{srTitle && <h2 className={"sr-only"}>{srTitle}</h2>}
		{children}
	</section>
);

const Sections = () => (
	<main className={"flex flex-col"}>
		<h1 className={"sr-only"}>История интернет-магазина Maroon</h1>
		{sections.map(({ id, Section, srOnlyTitle, title, classes }) => (
			<SectionWrapper key={id} srTitle={srOnlyTitle} classes={classes}>
				<Section title={title} />
			</SectionWrapper>
		))}
	</main>
);

export { Sections };
