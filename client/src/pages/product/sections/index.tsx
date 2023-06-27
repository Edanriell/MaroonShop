import { FC } from "react";
import { v4 as uuidv4 } from "uuid";

import ProductsSuggestions from "widgets/products-suggestions";

import Product from "./product";

import { CatalogPageSections, SectionWrapperProps } from "./types";
// TODO Check background colors
const sections: CatalogPageSections = [
	{
		id: uuidv4(),
		Section: Product,
		classes: "bg-red-600",
	},
	{
		id: uuidv4(),
		Section: ProductsSuggestions,
		title: "Вам также может понравиться",
		classes: "bg-red-600",
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
