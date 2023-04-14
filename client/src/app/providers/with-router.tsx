import { ReactNode } from "react";
// Importing ReactNode type.
import { BrowserRouter } from "react-router-dom";
// Importing BrowserRouter component.
// A <BrowserRouter> stores the current location in the browser's address bar
// using clean URLs and navigates using the browser's built-in history stack.
// For more info check official docs: https://reactrouter.com/en/main/router-components/browser-router.

// Creating our Higher-Order Component.
// A higher-order component is a function that takes a component and returns a new component.
// For full info check docs: https://hy.reactjs.org/docs/higher-order-components.html.
// eslint-disable-next-line react/display-name
const withRouter = (component: () => ReactNode) => () =>
	<BrowserRouter>{component()}</BrowserRouter>;

export { withRouter };
