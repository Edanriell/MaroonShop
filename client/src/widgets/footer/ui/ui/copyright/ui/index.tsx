import { Link } from "react-router-dom";

import { ReactComponent as CopyrightIcon } from "./assets/copyright.svg";

const Copyright = () => {
	return (
		<div className="container pt-[2.3rem] md:flex md:justify-between md:pt-[1.7rem]">
			<p className="flex items-center justify-start mb-[1.4rem] md:mb-[0rem]">
				<small className="font-normal font-mPlus text-sm-12px text-dusty-gray-500">
					Maroon
				</small>
				<CopyrightIcon className="w-[1.4rem] h-[1.4rem] ml-[0.5rem] mr-[0.5rem] text-silver-300" />
				<small className="font-normal font-mPlus text-sm-12px text-dusty-gray-500">
					2020 Все права защищены
				</small>
			</p>
			<Link to="/">
				<small
					className={`
						font-normal duration-500 ease-out font-mPlus 
						text-sm-12px text-dusty-gray-500 hover:text-dusty-gray-800
					`}
				>
					Политика конфиденциальности
				</small>
			</Link>
		</div>
	);
};

export default Copyright;
