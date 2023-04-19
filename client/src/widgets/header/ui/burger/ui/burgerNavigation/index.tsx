import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

type Navigation = Array<{
	label: string;
	url: string;
	key: string;
}>;

// TODO FIX links when will be creating corresponding pages.
const burgerNavigation: Navigation = [
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

function BurgerNavigation() {
	return (
		<nav aria-label="burger menu navigation">
			<ul className="flex flex-col gap-y-[3.5rem] md:gap-y-[4rem]">
				{burgerNavigation.map(({ label, url, key }) => (
					<li key={key}>
						<Link
							to={url}
							className={`
								font-medium text-sm-28px font-raleway text-blue-zodiac-950 md:text-md-32px
								duration-500 ease-out basic-hover-animation
							`}
						>
							{label}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
}

export default BurgerNavigation;
