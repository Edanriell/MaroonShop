import { Accordion, Checkbox } from "shared/ui";

import { useScreenSize } from "shared/lib/hooks";

const FaceFilters = ({ onFilterSelect }: { onFilterSelect: any }) => {
	const { width } = useScreenSize();

	return (
		<>
			{width < 768 && (
				<Accordion triggerName={"Уход для тела"} triggerType={"legend"}>
					<div className={"flex flex-col gap-y-[1.4rem]"}>
						<Checkbox
							htmlFor={"body-cream"}
							name={"Крема"}
							id={"body-cream"}
							onFilterSelect={onFilterSelect}
						/>
						<Checkbox
							htmlFor={"body-oil"}
							name={"Масла"}
							id={"body-oil"}
							onFilterSelect={onFilterSelect}
						/>
						<Checkbox
							htmlFor={"body-scrub"}
							name={"Скрабы"}
							id={"body-scrub"}
							onFilterSelect={onFilterSelect}
						/>
						<Checkbox
							htmlFor={"body-soap"}
							name={"Мыло"}
							id={"body-soap"}
							onFilterSelect={onFilterSelect}
						/>
						<Checkbox
							htmlFor={"body-bath-bomb"}
							name={"Бомбочки для ванны"}
							id={"body-bath-bomb"}
							onFilterSelect={onFilterSelect}
						/>
						<Checkbox
							className={"mb-[2.9rem]"}
							htmlFor={"body-bath-salt"}
							name={"Соль для ванны"}
							id={"body-bath-salt"}
							onFilterSelect={onFilterSelect}
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
							Уход для тела
						</span>
					</legend>
					<div className={"overflow-hidden"}>
						<div className={"flex flex-col gap-y-[1.4rem] lg:gap-y-[1rem]"}>
							<Checkbox
								htmlFor={"body-cream"}
								name={"Крема"}
								id={"body-cream"}
								onFilterSelect={onFilterSelect}
							/>
							<Checkbox
								htmlFor={"body-oil"}
								name={"Масла"}
								id={"body-oil"}
								onFilterSelect={onFilterSelect}
							/>
							<Checkbox
								htmlFor={"body-scrub"}
								name={"Скрабы"}
								id={"body-scrub"}
								onFilterSelect={onFilterSelect}
							/>
							<Checkbox
								htmlFor={"body-soap"}
								name={"Мыло"}
								id={"body-soap"}
								onFilterSelect={onFilterSelect}
							/>
							<Checkbox
								htmlFor={"body-bath-bomb"}
								name={"Бомбочки для ванны"}
								id={"body-bath-bomb"}
								onFilterSelect={onFilterSelect}
							/>
							<Checkbox
								className={"mb-[0rem]"}
								htmlFor={"body-bath-salt"}
								name={"Соль для ванны"}
								id={"body-bath-salt"}
								onFilterSelect={onFilterSelect}
							/>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default FaceFilters;
