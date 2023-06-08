import Routing from "pages";

import { withProviders } from "./providers";

import "./index.scss";

// JSX error fix for Swiper SLider.
declare global {
	namespace JSX {
		interface IntrinsicElements {
			"swiper-container": any;
			"swiper-slide": any;
		}
	}
}

const App = () => (
	<>
		<Routing />
	</>
);

export default withProviders(App);
