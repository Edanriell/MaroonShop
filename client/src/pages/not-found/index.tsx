import { Button } from "shared/ui";

import { ReactComponent as Logo } from "./assets/logo.svg";

const NotFoundPage = () => (
	<main>
		<div className={"flex flex-col items-center justify-center h-[100vh] gap-y-[2rem]"}>
			<Logo
				className={
					"text-blue-zodiac-950 h-auto " +
					"max-w-[26rem] min-w-[18rem] mr-[2rem] ml-[2rem] p-0"
				}
			/>
			<h1 className={"font-raleway text-md-18px lining-nums font-semibold p-0 m-0"}>
				Страница не найдена
			</h1>
			<Button type="link-internal" text="Вернуться на главную" linkInternal="/" />
		</div>
	</main>
);

export default NotFoundPage;
