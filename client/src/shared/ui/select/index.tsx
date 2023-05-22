import { SelectProps } from "./types";
import styles from "./styles.module.scss";

const Select = ({ selectName, selectId, labelContent, labelFor, children }: SelectProps) => {
	return (
		<div className="relative flex flex-col w-full">
			<label className="absolute pl-[1rem] pt-[1.2rem] font-raleway" htmlFor={labelFor}>
				{labelContent}
			</label>
			<select
				className={
					styles.select +
					" rounded-[0.2rem] border-none font-semibold pl-[1rem] " +
					"pr-[1rem] pb-[1rem] pt-[2.4rem] font-raleway bg-[#F7F7F8] text-sm-14px"
				}
				name={selectName}
				id={selectId}
			>
				{children}
			</select>
		</div>
	);
};

export default Select;
