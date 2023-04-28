import { Button } from "shared/ui";

type Props = {
	title: string;
};

function Bestsellers({ title }: Props) {
	return (
		<div className="container pt-[6rem] pb-[8rem]">
			<header className="flex flex-col gap-x-[2.5rem] mb-[5rem]">
				<h2 className="font-medium font-raleway text-sm-28px text-blue-zodiac-950">
					{title}
				</h2>
				<p className="font-normal font-mPLus text-sm-16px text-blue-zodiac-950">
					Легендарные продукты, завоевавшие любовь наших клиентов
				</p>
			</header>
			{/* <ProductCard/> */}
			<Button type="link" text="Смотреть все" link="/" />
		</div>
	);
}

export default Bestsellers;
