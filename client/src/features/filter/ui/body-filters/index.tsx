import { FC } from "react";

import { Accordion, Checkbox } from "shared/ui";

import { useScreenSize } from "shared/lib/hooks";

import { BodyFiltersProps } from "./types";

const BodyFilters: FC<BodyFiltersProps> = ({ onFilterSelect, isFiltersReset }) => {
	const { width } = useScreenSize();

	return (
		<>
			{width < 768 && (
				<Accordion triggerName={"Уход для лица"} triggerType={"legend"}>
					<div className={"flex flex-col gap-y-[1.4rem]"}>
						<Checkbox
							htmlFor={"face-cream"}
							name={"Крема"}
							id={"face-cream"}
							onFilterSelect={onFilterSelect}
							isFiltersReset={isFiltersReset}
						/>
						<Checkbox
							htmlFor={"face-serum"}
							name={"Сыворотки"}
							id={"face-serum"}
							onFilterSelect={onFilterSelect}
							isFiltersReset={isFiltersReset}
						/>
						<Checkbox
							htmlFor={"face-mask"}
							name={"Маски"}
							id={"face-mask"}
							onFilterSelect={onFilterSelect}
							isFiltersReset={isFiltersReset}
						/>
						<Checkbox
							htmlFor={"face-foam"}
							name={"Пенки"}
							id={"face-foam"}
							onFilterSelect={onFilterSelect}
							isFiltersReset={isFiltersReset}
						/>
						<Checkbox
							htmlFor={"face-tonic"}
							name={"Тоники"}
							id={"face-tonic"}
							onFilterSelect={onFilterSelect}
							isFiltersReset={isFiltersReset}
						/>
						<Checkbox
							className={"mb-[2.9rem]"}
							htmlFor={"face-powder"}
							name={"Пудры"}
							id={"face-powder"}
							onFilterSelect={onFilterSelect}
							isFiltersReset={isFiltersReset}
						/>
					</div>
				</Accordion>
			)}
			{width >= 768 && (
				<div>
					<legend className={"mb-[1.9rem] lg:mb-[1.8rem]"}>
						<span
							className={"font-medium font-mPlus text-sm-18px text-blue-zodiac-950"}
						>
							Уход для лица
						</span>
					</legend>
					<div className={"overflow-hidden"}>
						<div className={"flex flex-col gap-y-[1.4rem] lg:gap-y-[1rem]"}>
							<Checkbox
								htmlFor={"face-cream"}
								name={"Крема"}
								id={"face-cream"}
								onFilterSelect={onFilterSelect}
								isFiltersReset={isFiltersReset}
							/>
							<Checkbox
								htmlFor={"face-serum"}
								name={"Сыворотки"}
								id={"face-serum"}
								onFilterSelect={onFilterSelect}
								isFiltersReset={isFiltersReset}
							/>
							<Checkbox
								htmlFor={"face-mask"}
								name={"Маски"}
								id={"face-mask"}
								onFilterSelect={onFilterSelect}
								isFiltersReset={isFiltersReset}
							/>
							<Checkbox
								htmlFor={"face-foam"}
								name={"Пенки"}
								id={"face-foam"}
								onFilterSelect={onFilterSelect}
								isFiltersReset={isFiltersReset}
							/>
							<Checkbox
								htmlFor={"face-tonic"}
								name={"Тоники"}
								id={"face-tonic"}
								onFilterSelect={onFilterSelect}
								isFiltersReset={isFiltersReset}
							/>
							<Checkbox
								className={"mb-[0rem]"}
								htmlFor={"face-powder"}
								name={"Пудры"}
								id={"face-powder"}
								onFilterSelect={onFilterSelect}
								isFiltersReset={isFiltersReset}
							/>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default BodyFilters;
