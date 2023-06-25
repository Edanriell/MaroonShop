const BestsellersNotFound = () => {
	return (
		<div
			className={
				"flex flex-col items-center md:absolute " +
				"md:top-[50%] md:left-[50%] md:translate-x-[-50%] " +
				"md:tranlsate-y-[-50%]"
			}
		>
			<p className={"font-raleway text-sm-14px mb-[1rem] md:text-md-16px font-medium"}>
				Не найдено не одного бестселлера.
			</p>
		</div>
	);
};

export default BestsellersNotFound;
