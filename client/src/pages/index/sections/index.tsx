import { FC, ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";

import Hero from "./hero";

type TSections = Array<{
	id: string;
	classes: string;
	Section: ReactNode | null | (() => null);
	title: string;
	titleSrOnly: boolean;
}>;

const SectionWrapper: FC<{ children: ReactNode }> = ({ children }) => <section>{children}</section>;

// TODO Write missing types, fix sectionWrapper component, think about decomposition in WIDGETS!!!!
const sections: TSections = [
	{
		id: uuidv4(),
		classes: "",
		Section: Hero,
		title: "",
		titleSrOnly: true,
	},
];

const Sections = () => (
	<main className="flex flex-col">
		{sections.map(({ id, classes, Section, title, titleSrOnly }) => (
			<SectionWrapper key={id}>
				<Section />
			</SectionWrapper>
		))}
	</main>
);

export default Sections;
