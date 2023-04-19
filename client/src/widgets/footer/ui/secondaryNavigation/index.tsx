import { Link } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";

type SecondaryNavigationElements = Array<{
	label: string;
	classes: string;
	url: string;
	key: string;
}>;

// TODO Change urls when all necessary pages are created.
const secondaryNavigation: SecondaryNavigationElements = [
	{
		label: "Каталог",
		classes: "",
		url: "/",
		key: uuidv4(),
	},
	{
		label: "О нас",
		classes: "",
		url: "/",
		key: uuidv4(),
	},
	{
		label: "Магазины",
		classes: "",
		url: "/",
		key: uuidv4(),
	},
	{
		label: "Контакты",
		classes: "",
		url: "/",
		key: uuidv4(),
	},
];

const SecondaryNavigation = () => {
	return (
		<nav aria-label="secondary navigation">
			<ul>
				{secondaryNavigation.map(({ label, classes, url, key }) => (
					<li key={key}>
						<Link to={url} className={classes}>
							{label}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default SecondaryNavigation;
