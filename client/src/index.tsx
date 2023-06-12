import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import reportWebVitals from "./reportWebVitals";

import App from "./app";

import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLDivElement);

root.render(
	<StrictMode>
		<App />
	</StrictMode>,
);

reportWebVitals();
