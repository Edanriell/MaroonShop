import { FC } from "react";
import { v4 as uuidv4 } from "uuid";

import { Contacts } from "widgets/contacts";

import ShopList from "./shop-list";

import { ShopListPageSections, SectionWrapperProps } from "./types";

const sections: ShopListPageSections = [
	{
		id: uuidv4(),
		Section: ShopList,
		title: "Полный список магазинов",
		classes: "bg-desert-storm-50",
	},
	{
		id: uuidv4(),
		Section: Contacts,
		sectionProperties: {
			street: "ул. Большая Конюшенная, 19",
			city: "Санкт-Петербург",
			phoneNumber: "+7 (923) 888-90-60",
			phoneNumberHref: "tel:+79238889060",
			emailAddress: "info@maroon.ru",
			emailAddressHref: "mailto:info@maroon.ru",
			coordinates: [18.06324, 59.334591],
		},
		title: "Контакты",
		classes: "bg-desert-storm-50",
	},
	{
		id: uuidv4(),
		Section: Contacts,
		sectionProperties: {
			street: "ул. Большая Конюшенная, 19",
			city: "Санкт-Петербург",
			phoneNumber: "+7 (923) 888-90-60",
			phoneNumberHref: "tel:+79238889060",
			emailAddress: "info@maroon.ru",
			emailAddressHref: "mailto:info@maroon.ru",
			coordinates: [32.06324, 59.334591],
		},
		title: "Контакты",
		classes: "bg-desert-storm-50",
	},
	{
		id: uuidv4(),
		Section: Contacts,
		sectionProperties: {
			street: "ул. Большая Конюшенная, 19",
			city: "Санкт-Петербург",
			phoneNumber: "+7 (923) 888-90-60",
			phoneNumberHref: "tel:+79238889060",
			emailAddress: "info@maroon.ru",
			emailAddressHref: "mailto:info@maroon.ru",
			coordinates: [28.06324, 59.334591],
		},
		title: "Контакты",
		classes: "bg-desert-storm-50",
	},
	{
		id: uuidv4(),
		Section: Contacts,
		sectionProperties: {
			street: "ул. Большая Конюшенная, 19",
			city: "Санкт-Петербург",
			phoneNumber: "+7 (923) 888-90-60",
			phoneNumberHref: "tel:+79238889060",
			emailAddress: "info@maroon.ru",
			emailAddressHref: "mailto:info@maroon.ru",
			coordinates: [26.06324, 59.334591],
		},
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
		<h1 className={"sr-only"}>Полный список магазинов Maroon</h1>
		{sections.map(({ id, Section, sectionProperties, srOnlyTitle, title, classes }) => (
			<SectionWrapper key={id} srTitle={srOnlyTitle} classes={classes}>
				<Section title={title} contactsProperties={sectionProperties} />
			</SectionWrapper>
		))}
	</main>
);

export { Sections };
