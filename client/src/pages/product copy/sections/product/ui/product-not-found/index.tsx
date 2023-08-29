import { Button } from "shared/ui";

const ProductNotFound = () => {
	return (
		<div className="flex flex-col items-center justify-center mt-[26rem] mb-[26rem]">
			<p className="font-raleway font-medium text-sm-18px mb-[1rem] md:text-[2.2rem]">
				Товар не найден.
			</p>
			<Button
				type={"link-internal"}
				text={"Вернутся в каталог"}
				linkInternal={"/catalog"}
				borderColor={"#122947"}
				backgroundColor={"#122947"}
				textColor={"#FFF"}
			/>
		</div>
	);
};

export default ProductNotFound;
