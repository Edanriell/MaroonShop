import { lazy, Suspense } from "react";
// Importing lazy function also Suspense component.
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// Importing createBrowserRouter function and RouterProvider component;

const IndexPage = lazy(() => import("./index/index"));

const router = createBrowserRouter([
	{
		path: "/",
		element: <IndexPage />,
	},
]);

function Routing() {
	return <RouterProvider router={router} />;
}

export default Routing;
// Exporting Routing component.
