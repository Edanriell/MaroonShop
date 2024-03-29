import { FC } from "react";

import { Accordion, Checkbox } from "shared/ui";
import { useScreenSize } from "shared/lib/hooks";

import { SkinTypeFiltersProps } from "./types";

const SkinTypeFilters: FC<SkinTypeFiltersProps> = ({ onFilterSelect, isFiltersReset }) => {
	const { width } = useScreenSize();

	return (
		<>
			{width < 768 && (
				<Accordion
					className={"pb-[4.3rem]"}
					triggerName={"Тип кожи"}
					triggerType={"legend"}
				>
					<div className={"flex flex-col gap-y-[1.4rem]"}>
						<Checkbox
							htmlFor={"skin-normal"}
							name={"Нормальная"}
							id={"skin-normal"}
							onFilterSelect={onFilterSelect}
							isFiltersReset={isFiltersReset}
						/>
						<Checkbox
							htmlFor={"skin-dry"}
							name={"Сухая"}
							id={"skin-dry"}
							onFilterSelect={onFilterSelect}
							isFiltersReset={isFiltersReset}
						/>
						<Checkbox
							htmlFor={"skin-fat"}
							name={"Жирная"}
							id={"skin-fat"}
							onFilterSelect={onFilterSelect}
							isFiltersReset={isFiltersReset}
						/>
						<Checkbox
							className={"mb-[0.3rem]"}
							htmlFor={"skin-combined"}
							name={"Комбинированная"}
							id={"skin-combined"}
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
							Тип кожи
						</span>
					</legend>
					<div className={"overflow-hidden"}>
						<div className={"flex flex-col gap-y-[1.4rem] lg:gap-y-[1rem]"}>
							<Checkbox
								htmlFor={"skin-normal"}
								name={"Нормальная"}
								id={"skin-normal"}
								onFilterSelect={onFilterSelect}
								isFiltersReset={isFiltersReset}
							/>
							<Checkbox
								htmlFor={"skin-dry"}
								name={"Сухая"}
								id={"skin-dry"}
								onFilterSelect={onFilterSelect}
								isFiltersReset={isFiltersReset}
							/>
							<Checkbox
								htmlFor={"skin-fat"}
								name={"Жирная"}
								id={"skin-fat"}
								onFilterSelect={onFilterSelect}
								isFiltersReset={isFiltersReset}
							/>
							<Checkbox
								className={"mb-[0rem]"}
								htmlFor={"skin-combined"}
								name={"Комбинированная"}
								id={"skin-combined"}
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

export default SkinTypeFilters;
