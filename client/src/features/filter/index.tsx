import { useState, FC } from "react";

import { Button } from "shared/ui";

import { FilterProps } from "./types";

import { ReactComponent as Cross } from "./assets/cross.svg";

const Filter: FC<FilterProps> = ({ className }) => {
	const [isShown, setIsShown] = useState<boolean>(false);

	function handleButtonClick() {
		setIsShown(!isShown);
	}

	if (isShown) {
		return (
			<>
				<div className="row-start-1 row-end-2 justify-self-end">
					<button onClick={handleButtonClick} type="button">
						<Cross
							className={
								"w-[1.4rem] h-[1.4rem] md:w-[1.8rem] md:h-[1.8rem] text-blue-zodiac-950"
							}
						/>
						<span className="sr-only">Закрыть фильтры</span>
					</button>
				</div>
				<form
					className="grid col-start-1 col-end-3 row-start-2 row-end-3 justify-self-center"
					action="#"
					method="get"
				>
					<fieldset>
						<legend>Уход для лица</legend>
						<div className="flex flex-row-reverse items-center justify-end">
							<label className={"cursor-pointer"} htmlFor="cream">
								Крема
							</label>
							<input type="checkbox" name="Крема" id="cream" />
						</div>
						<div className="flex flex-row-reverse items-center justify-end">
							<label className={"cursor-pointer"} htmlFor="serum">
								Сыворотки
							</label>
							<input type="checkbox" name="Сыворотки" id="serum" />
						</div>
						<div className="flex flex-row-reverse items-center justify-end">
							<label className={"cursor-pointer"} htmlFor="mask">
								Маски
							</label>
							<input type="checkbox" name="Маски" id="mask" />
						</div>
						<div className="flex flex-row-reverse items-center justify-end">
							<label className={"cursor-pointer"} htmlFor="foam">
								Пенки
							</label>
							<input type="checkbox" name="Пенки" id="foam" />
						</div>
						<div className="flex flex-row-reverse items-center justify-end">
							<label className={"cursor-pointer"} htmlFor="tonic">
								Тоники
							</label>
							<input
								className={"cursor-pointer"}
								type="checkbox"
								name="Тоники"
								id="tonic"
							/>
						</div>
						<div className="flex flex-row-reverse items-center justify-end">
							<label className={"cursor-pointer"} htmlFor="powder">
								Пудры
							</label>
							<input type="checkbox" name="Пудры" id="powder" />
						</div>
					</fieldset>
					<fieldset>
						<legend>Уход для тела</legend>
						<div className="flex flex-row-reverse items-center justify-end">
							<label className={"cursor-pointer"} htmlFor="cream">
								Крема
							</label>
							<input type="checkbox" name="Крема" id="cream" />
						</div>
						<div className="flex flex-row-reverse items-center justify-end">
							<label className={"cursor-pointer"} htmlFor="oil">
								Масла
							</label>
							<input type="checkbox" name="Масла" id="oil" />
						</div>
						<div className="flex flex-row-reverse items-center justify-end">
							<label className={"cursor-pointer"} htmlFor="scrub">
								Скрабы
							</label>
							<input type="checkbox" name="Скрабы" id="scrub" />
						</div>
						<div className="flex flex-row-reverse items-center justify-end">
							<label className={"cursor-pointer"} htmlFor="soap">
								Мыло
							</label>
							<input type="checkbox" name="Мыло" id="soap" />
						</div>
						<div className="flex flex-row-reverse items-center justify-end">
							<label className={"cursor-pointer"} htmlFor="bath-bomb">
								Бомбочки для ванны
							</label>
							<input type="checkbox" name="Бомбочки для ванны" id="bath-bomb" />
						</div>
						<div className="flex flex-row-reverse items-center justify-end">
							<label className={"cursor-pointer"} htmlFor="bath-salt">
								Соль для ванны
							</label>
							<input type="checkbox" name="Соль для ванны" id="bath-salt" />
						</div>
					</fieldset>
					<fieldset>
						<legend>Тип кожи</legend>
						<div className="flex flex-row-reverse items-center justify-end">
							<label className={"cursor-pointer"} htmlFor="normal">
								Нормальная
							</label>
							<input type="checkbox" name="Нормальная" id="normal" />
						</div>
						<div className="flex flex-row-reverse items-center justify-end">
							<label className={"cursor-pointer"} htmlFor="dry">
								Сухая
							</label>
							<input type="checkbox" name="Сухая" id="dry" />
						</div>
						<div className="flex flex-row-reverse items-center justify-end">
							<label className={"cursor-pointer"} htmlFor="fat">
								Жирная
							</label>
							<input type="checkbox" name="Жирная" id="fat" />
						</div>
						<div className="flex flex-row-reverse items-center justify-end">
							<label className={"cursor-pointer"} htmlFor="combined">
								Комбинированная{" "}
							</label>
							<input type="checkbox" name="Комбинированная " id="combined" />
						</div>
					</fieldset>
					<div className="flex flex-row items-center">
						<Button text={"Применить"} type="submit" />
						<Button text={"Сбросить"} type="reset" />
					</div>
				</form>
			</>
		);
	}

	return (
		<div className="row-start-1 row-end-2 justify-self-end">
			<Button onClick={handleButtonClick} text={"Фильтр"} className={className} />
		</div>
	);
};

export default Filter;
