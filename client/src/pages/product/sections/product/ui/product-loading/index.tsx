import { Spinner } from "shared/ui";

const ProductLoading = () => {
	return (
		<div className="flex flex-col items-center justify-center mt-[26rem] mb-[26rem]">
			<p className="font-raleway font-medium text-sm-18px mb-[1rem] md:text-[2.2rem]">
				Загрузка товара
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

export default ProductLoading;
