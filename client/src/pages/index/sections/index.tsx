import { FC, ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";

import HeroSection from "./hero";

type IndexPageSections = Array<{
	id: string;
	sectionClasses?: string;
	sectionWrapperClasses?: string;
	title?: string;
	Section: any;
	srOnlyTitle?: string;
}>;

const sections: IndexPageSections = [
	{
		id: uuidv4(),
		sectionClasses: "",
		Section: HeroSection,
		srOnlyTitle: "",
	},
];

const SectionWrapper: FC<{ srTitle?: string; children: ReactNode }> = ({ children, srTitle }) => (
	<section>
		{srTitle && <h2 className="sr-only">{srTitle}</h2>}
		{children}
	</section>
);

const Sections = () => (
	<main className="flex flex-col">
		<h1 className="sr-only">Главная страница интернет-магазина Maroon</h1>
		{sections.map(({ id, sectionClasses, Section, srOnlyTitle }) => (
			<SectionWrapper key={id} srTitle={srOnlyTitle}>
				<Section classes={sectionClasses} />
			</SectionWrapper>
		))}
	</main>
);

export default Sections;
