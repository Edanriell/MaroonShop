import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// TODO add beautiful spinner.
const IndexPage = lazy(() => import("./index/index"));

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<Suspense fallback={<span>Loading...</span>}>
				<IndexPage />
			</Suspense>
		),
	},
]);

function Routing() {
	return <RouterProvider router={router} />;
}

export default Routing;
