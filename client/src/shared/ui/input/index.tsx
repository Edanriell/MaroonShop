import { InputProps } from "./types";

const Input = ({ inputType, inputId, inputName, labelContent, labelFor }: InputProps) => {
	return (
		<div className="relative flex flex-col w-full">
			<label className="absolute pl-[1rem] pt-[1.2rem] font-raleway" htmlFor={labelFor}>
				{labelContent}
			</label>
			<input
				className={
					"rounded-[0.2rem] border-none font-semibold " +
					"pl-[1rem] pr-[1rem] pb-[1rem] pt-[2.4rem] font-raleway " +
					"bg-[#F7F7F8] text-sm-14px"
				}
				type={inputType}
				name={inputName}
				id={inputId}
			/>
		</div>
	);
};

export default Input;
