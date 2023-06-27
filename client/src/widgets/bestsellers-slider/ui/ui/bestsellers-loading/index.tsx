import { Spinner } from "shared/ui";

const BestsellersLoading = () => {
	return (
		<div
			className={
				"flex flex-col items-center md:absolute " +
				"md:top-[50%] md:left-[50%] md:translate-x-[-50%] " +
				"md:tranlsate-y-[-50%]"
			}
		>
			<p className={"font-normal font-raleway text-sm-14px mb-[1rem] md:text-md-18px"}>
				Загрузка товаров
			</p>
			<Spinner width={"3rem"} height={"3rem"} color={"blue-zodiac-950"} />
		</div>
	);
};

export default BestsellersLoading;
