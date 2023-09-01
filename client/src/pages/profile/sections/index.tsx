import { FC } from "react";
import { v4 as uuidv4 } from "uuid";

import profile from "./profile";

import { ProfilePageSections, SectionWrapperProps } from "./types";

const sections: ProfilePageSections = [
	{
		id: uuidv4(),
		Section: profile,
		classes: "bg-desert-storm-50",
		title: "Профиль",
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
