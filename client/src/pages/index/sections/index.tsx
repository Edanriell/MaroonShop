import { FC } from "react";
import { v4 as uuidv4 } from "uuid";

import Hero from "./hero";
import Bestsellers from "./bestsellers";
import NewCollection from "./new-collection";
import IndividualCare from "./individual-care";
import ShopHistory from "./shop-history";
import JoinUs from "./join-us";
import Contacts from "./contacts";

import { IndexPageSections, SectionWrapperProps } from "./types";

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
	{
		id: uuidv4(),
		Section: ShopHistory,
		srOnlyTitle: "История магазина",
	},
	{
		id: uuidv4(),
		Section: JoinUs,
		title: "Присоединяйтесь к нам",
		classes: "bg-desert-storm-50",
	},
	{
		id: uuidv4(),
		Section: Contacts,
		title: "Контакты",
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
		<h1 className={"sr-only"}>Главная страница интернет-магазина Maroon</h1>
		{sections.map(({ id, Section, srOnlyTitle, title, classes }) => (
			<SectionWrapper key={id} srTitle={srOnlyTitle} classes={classes}>
				<Section title={title} />
			</SectionWrapper>
		))}
	</main>
);

export { Sections };
