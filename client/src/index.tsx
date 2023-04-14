import { StrictMode } from "react";
// Importing StrictMode component.
import ReactDOM from "react-dom/client";
// We need to import ReactDOM because we need to create root element where eventually our app will be hooked up.

import App from "./app";
// Importing our main component App.
import reportWebVitals from "./reportWebVitals";
// Importing reportWebVitals which helps us to measure performance of our app.
// This function is optional and can be omitted.

import "./index.scss";
// Importing very basic styling of our app. This is fully optional.

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
// Creating a root element and calling a render method on it.
// Passing down as arguments StrictMode and App components.

// About StrictMode.
// <StrictMode> lets you find common bugs in your components early during development.
// Strict Mode enables the following development-only behaviors:
// Your components will re-render an extra time to find bugs caused by impure rendering.
// Your components will re-run Effects an extra time to find bugs caused by missing Effect cleanup.
// Your components will be checked for usage of deprecated APIs.
// All of these checks are development-only and do not impact the production build.
// For more info visit official docs: https://react.dev/reference/react/StrictMode.

root.render(
	<StrictMode>
		<App />
	</StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
