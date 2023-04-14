import React from "react";
import { withProviders } from "./providers";
import "./index.scss";

const App = () => (
	<>
		<Routing />
	</>
);

export default withProviders(App);
