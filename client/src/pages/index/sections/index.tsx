import { v4 as uuidv4 } from "uuid";

import Hero from "./hero";

const SectionWrapper = ({ children }) => <section>{children}</section>;

// TODO Write missing types, fix sectionWrapper component, think about decomposition in WIDGETS!!
const sections = [
	{
		id: uuidv4(),
		classes: "",
		Section: Hero,
		title: "",
		titleSrOnly: true,
	},
];

const Sections = () => (
	<div className="flex flex-col">
		{sections.map(({id, classes, Section, title, titleSrOnly}) => (
			<SectionWrapper key={id}>
                <Section className={classes} sectionTitle={title} sectionTitleSrOnly={titleSrOnly} />
			<SectionWrapper />
		))}
	</div>
);

export default Sections;
