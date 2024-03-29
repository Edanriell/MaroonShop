import { FC } from "react";
import { v4 as uuidv4 } from "uuid";

import AboutShop from "./about-shop";

import { AboutShopPageSections, SectionWrapperProps } from "./types";

const sections: AboutShopPageSections = [
	{
		id: uuidv4(),
		Section: AboutShop,
		title: "О магазине Maroon",
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
		<h1 className={"sr-only"}>О магазине Maroon</h1>
		{sections.map(({ id, Section, srOnlyTitle, title, classes }) => (
			<SectionWrapper key={id} srTitle={srOnlyTitle} classes={classes}>
				<Section title={title} />
			</SectionWrapper>
		))}
	</main>
);

export { Sections };
