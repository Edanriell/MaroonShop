import { Link } from "react-router-dom";
// Importing Link component, to be able to visit other pages of the website.
// Main difference between NavLink and Link components lays in classes, when we use NavLink component we can highlight
// page that we are at the moment.

import { v4 as uuidv4 } from "uuid";
// Importing unique id generator for keys.

type MainNavigation = Array<{
	label: string;
	url: string;
	key: string;
}>;
// MainNavigation type.

// TODO FIX links when will be creating corresponding pages.
const mainNavigation: MainNavigation = [
	{
		label: "Каталог",
		url: "/",
		key: uuidv4(),
	},
	{
		label: "О нас",
		url: "/",
		key: uuidv4(),
	},
	{
		label: "Контакты",
		url: "/",
		key: uuidv4(),
	},
];
// mainNavigation contains an array of objects. We will use objects to generate correct NavLinks.

function PrimaryNavigation() {
	return (
		<nav aria-label="primary navigation">
			<ul className="flex items-center justify-start gap-x-[3.5rem] mr-[5.1rem]">
				{mainNavigation.map(({ label, url, key }) => (
					<li key={key}>
						<Link
							to={url}
							className="font-normal text-lg-16px font-mPlus text-blue-zodiac"
						>
							{label}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
}

export default PrimaryNavigation;
