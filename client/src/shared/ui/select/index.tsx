import { SelectProps } from "./types";
import styles from "./styles.module.scss";

const Select = ({
	selectName,
	selectId,
	labelContent,
	labelFor,
	children,
	classes = "",
	...rest
}: SelectProps) => {
	const { selectValue, onSelectChange } = rest;

	return (
		<div className={"relative flex flex-col w-full"}>
			<label
				className={"absolute pl-[1rem] pt-[1.2rem] font-raleway text-blue-zodiac-950"}
				htmlFor={labelFor}
			>
				{labelContent}
			</label>
			<select
				className={
					classes +
					" " +
					styles.select +
					" rounded-[0.2rem] border-none font-semibold pl-[1rem] " +
					"pr-[1rem] pb-[1rem] pt-[2.4rem] font-raleway bg-athens-gray-50 " +
					"text-sm-14px duration-500 ease-out hover:bg-athens-gray-100 " +
					"focus:bg-athens-gray-100 text-blue-zodiac-950"
				}
				name={selectName}
				id={selectId}
				value={selectValue}
				onChange={onSelectChange}
			>
				{children}
			</select>
		</div>
	);
};

export default Select;
