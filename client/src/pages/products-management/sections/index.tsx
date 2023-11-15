import { FC } from "react";
import { v4 as uuidv4 } from "uuid";

import products from "./products";

import { ProductsManagementPageSections, SectionWrapperProps } from "./types";

const sections: ProductsManagementPageSections = [
	{
		id: uuidv4(),
		Section: products,
		classes: "bg-desert-storm-50",
		title: "Товары",
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
		{sections.map(({ id, Section, srOnlyTitle, title, classes }) => (
			<SectionWrapper key={id} srTitle={srOnlyTitle} classes={classes}>
				<Section title={title} />
			</SectionWrapper>
		))}
	</main>
);

export { Sections };
