import { Spinner } from "shared/ui";

const ProductSuggestionsLoading = () => {
	return (
		<div
			className={
				"flex flex-col items-center justify-center mt-[12rem] mb-[12rem] " +
				"md:mt-[28rem] md:mb-[28rem] lg:mt-[14rem] lg:mb-[14rem]"
			}
		>
			<p className={"font-raleway font-medium text-sm-18px mb-[1rem] md:text-[2.2rem]"}>
				Загрузка товаров
			</p>
			<Spinner
				className={"w-[4.2rem] h-[4.2rem] md:w-[4.6rem] md:h-[4.6rem]"}
				width={"3rem"}
				height={"3rem"}
				color={"blue-zodiac-950"}
			/>
		</div>
	);
};

export default ProductSuggestionsLoading;
