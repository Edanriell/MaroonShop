import { FunctionComponent, SVGProps } from "react";
import { NavLink } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { ReactComponent as CartIcon } from "../assets/cart.svg";
import { ReactComponent as AuthIcon } from "../assets/auth.svg";

type UserActions = Array<{
	label: string;
	Icon: FunctionComponent<SVGProps<SVGSVGElement>>;
	iconWidth: string;
	iconHeight: string;
	url: string;
	key: string;
}>;

// TODO FIX links when will be creating corresponding pages.
const userActions: UserActions = [
	{
		label: "Аутентификация",
		Icon: AuthIcon,
		iconWidth: "w-[1.3rem] md:w-[1.6rem]",
		iconHeight: "h-[1.6rem] md:h-[2.1rem]",
		url: "/",
		key: uuidv4(),
	},
	{
		label: "Корзина",
		Icon: CartIcon,
		iconWidth: "w-[1.4rem] md:w-[1.8rem]",
		iconHeight: "h-[1.6rem] md:h-[2.1rem]",
		url: "/",
		key: uuidv4(),
	},
];

function Toolbar() {
	return (
		<ul className="flex items-center justify-start gap-x-[2rem] md:gap-x-[3rem] relative z-10">
			{userActions.map(({ label, Icon, iconWidth, iconHeight, url, key }) => (
				<li key={key}>
					<NavLink to={url}>
						<Icon className={iconWidth + " " + iconHeight + " text-blue-zodiac"} />
						<span className="sr-only">{label}</span>
					</NavLink>
				</li>
			))}
		</ul>
	);
}

export default Toolbar;
