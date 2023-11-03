import { FC } from "react";
import { v4 as uuidv4 } from "uuid";

import ProductSuggestions from "widgets/product-suggestions";

import Product from "./product";

import { CatalogPageSections, SectionWrapperProps } from "./types";

const sections: CatalogPageSections = [
	{
		id: uuidv4(),
		Section: Product,
		classes: "bg-desert-storm-50",
	},
	{
		id: uuidv4(),
		Section: ProductSuggestions,
		title: "Вам также может понравиться",
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
		{sections.map(({ id, Section, srOnlyTitle, title, classes }) => (
			<SectionWrapper key={id} srTitle={srOnlyTitle} classes={classes}>
				<Section title={title} />
			</SectionWrapper>
		))}
	</main>
);

export { Sections };
