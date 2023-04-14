import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";

// TODO Add beautiful spinner.

// eslint-disable-next-line react/display-name
const withRouter = (component: () => React.ReactNode) => () =>
	(
		<BrowserRouter>
			<Suspense fallback={<span>Loading...</span>}>{component()}</Suspense>
		</BrowserRouter>
	);

export { withRouter };
