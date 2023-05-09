import { FC, ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";

import Hero from "./hero";
import Bestsellers from "./bestsellers";
import NewCollection from "./new-collection";
import IndividualCare from "./individual-care";

type IndexPageSections = Array<{
	id: string;
	Section: any;
	title?: string;
	srOnlyTitle?: string;
	classes?: string;
}>;

type SectionWrapperProps = {
	srTitle?: string;
	title?: string;
	classes?: string;
	children: ReactNode;
};

const sections: IndexPageSections = [
	{
		id: uuidv4(),
		Section: Hero,
		title: "MAROON",
	},
	{
		id: uuidv4(),
		Section: Bestsellers,
		title: "Бестселлеры",
		classes: "bg-desert-storm-50",
	},
	{
		id: uuidv4(),
		Section: NewCollection,
		srOnlyTitle: "Новинки",
	},
	{
		id: uuidv4(),
		Section: IndividualCare,
		title: "Индивидуальный уход",
		classes: "bg-desert-storm-50",
	},
];

const SectionWrapper: FC<SectionWrapperProps> = ({ srTitle, children, classes }) => (
	<section className={classes ?? " " + "relative z-[1]"}>
		{srTitle && <h2 className="sr-only">{srTitle}</h2>}
		{children}
	</section>
);

const Sections = () => (
	<main className="flex flex-col">
		<h1 className="sr-only">Главная страница интернет-магазина Maroon</h1>
		{sections.map(({ id, Section, srOnlyTitle, title, classes }) => (
			<SectionWrapper key={id} srTitle={srOnlyTitle} classes={classes}>
				<Section title={title} />
			</SectionWrapper>
		))}
	</main>
);

export { Sections };
