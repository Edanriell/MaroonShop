import { FC } from "react";
import { v4 as uuidv4 } from "uuid";

import ProductsCart from "./products-cart";

import { ContactsPageSections, SectionWrapperProps } from "./types";

const sections: ContactsPageSections = [
	{
		id: uuidv4(),
		Section: ProductsCart,
		title: "Корзина товаров",
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
		<h1 className={"sr-only"}>Корзина товаров</h1>
		{sections.map(({ id, Section, srOnlyTitle, title, classes }) => (
			<SectionWrapper key={id} srTitle={srOnlyTitle} classes={classes}>
				<Section title={title} />
			</SectionWrapper>
		))}
	</main>
);

export { Sections };
