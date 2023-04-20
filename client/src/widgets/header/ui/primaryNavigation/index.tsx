import { NavLink } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

type MainNavigation = Array<{
	label: string;
	url: string;
	key: string;
}>;

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

function PrimaryNavigation() {
	return (
		<nav aria-label="primary navigation">
			<ul className="flex items-center justify-start gap-x-[3.5rem] mr-[5.1rem]">
				{mainNavigation.map(({ label, url, key }) => (
					<li key={key}>
						<NavLink
							to={url}
							className={`
								font-normal text-lg-16px font-mPlus text-blue-zodiac-950
								duration-500 ease-out basic-hover-underline-animation
							`}
						>
							<span>{label}</span>
						</NavLink>
					</li>
				))}
			</ul>
		</nav>
	);
}

export default PrimaryNavigation;
