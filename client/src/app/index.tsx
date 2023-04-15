// Entry point of our app.

import Routing from "pages";
// Importing our Routing component which will be placed in our App component body.
// import { withProviders } from "./providers";
// Importing all app providers, which are wrapped by compose-function.

import "./index.scss";
// Importing app global styles.

const App = () => (
	<>
		<Routing />
	</>
);

// export default withProviders(App);
// Exporting our main App component with providers.

export default App;
