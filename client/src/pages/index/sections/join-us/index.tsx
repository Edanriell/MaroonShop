import { Button } from "shared/ui";

import { Gallery } from "./ui";

type Props = {
	title: string;
};

const JoinUs = ({ title }: Props) => {
	return (
		<div
			className={`pt-[7.2rem] pb-[8rem] pr-[1.5rem] pl-[1.5rem] md:pt-[12rem] md:pb-[12rem] md:pl-[4.5rem] md:pr-[4.5rem] lg:pt-[14rem] lg:pb-[14rem] lg:pl-[9.8rem] lg:pr-[9.8rem]`}
		>
			<div
				className={`flex flex-col gap-y-[5rem] md:flex-row-reverse md:gap-y-[0rem] md:justify-between md:items-center`}
			>
				<div
					className={`flex flex-col items-center pr-[1.4rem] pl-[1.4rem] md:pr-[0rem] md:pl-[0rem] md:items-start md:max-w-[38.1rem] md:ml-[2.8rem] lg:ml-[0rem]`}
				>
					<h2
						className={`font-medium text-center font-raleway text-sm-28px-lh-35px text-blue-zodiac-950 mb-[1.1rem] md:text-left md:text-md-32px md:mb-[1.5rem] lg:mb-[1.4rem] lg:text-lg-32px`}
					>
						{title}
					</h2>
					<p
						className={`font-normal font-mPlus text-sm-16px text-center text-blue-zodiac-950 mb-[2.4rem] md:text-left md:text-md-18px md:mb-[3.3rem]`}
					>
						Подпишитесь на наш аккаунт @marooncare и узнавайте о новиках и акциях
						первыми
					</p>
					<Button
						type="link-external"
						linkExternal="https://www.instagram.com/"
						text="Подписаться"
						classes="md:pl-[3.3rem] md:pr-[3.3rem]"
					/>
				</div>
				<Gallery />
			</div>
		</div>
	);
};

export default JoinUs;
