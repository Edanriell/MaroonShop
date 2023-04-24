import { FC, ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";

import HeroSection from "./hero";

type IndexPageSections = Array<{
	id: string;
	Section: any;
	title?: string;
	srOnlyTitle?: string;
}>;

type SectionWrapperProps = {
	srTitle?: string;
	title?: string;
	children: ReactNode;
};

const sections: IndexPageSections = [
	{
		id: uuidv4(),
		Section: HeroSection,
		title: "MAROON",
	},
];

const SectionWrapper: FC<SectionWrapperProps> = ({ children, srTitle }) => (
	<section>
		{srTitle && <h2 className="sr-only">{srTitle}</h2>}
		{children}
	</section>
);

const Sections = () => (
	<main className="flex flex-col">
		<h1 className="sr-only">Главная страница интернет-магазина Maroon</h1>
		{sections.map(({ id, Section, srOnlyTitle, title }) => (
			<SectionWrapper key={id} srTitle={srOnlyTitle}>
				<Section title={title} />
			</SectionWrapper>
		))}
	</main>
);

export { Sections };
