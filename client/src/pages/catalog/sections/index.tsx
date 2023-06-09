import { FC } from "react";
import { v4 as uuidv4 } from "uuid";

import { JoinUs } from "widgets/join-us";
import { Contacts } from "widgets/contacts";

import Catalog from "./catalog";
import RecentlyWatched from "./recently-watched";

import { CatalogPageSections, SectionWrapperProps } from "./types";

const sections: CatalogPageSections = [
	{
		id: uuidv4(),
		Section: Catalog,
		title: "Каталог",
		classes: "bg-desert-storm-50",
	},
	{
		id: uuidv4(),
		Section: RecentlyWatched,
		title: "Вы недавно смотрели",
		classes: "bg-desert-storm-50",
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
		<h1 className={"sr-only"}>Каталог интернет-магазина Maroon</h1>
		{sections.map(({ id, Section, srOnlyTitle, title, classes }) => (
			<SectionWrapper key={id} srTitle={srOnlyTitle} classes={classes}>
				<Section title={title} />
			</SectionWrapper>
		))}
	</main>
);

export { Sections };
