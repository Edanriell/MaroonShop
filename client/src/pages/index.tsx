import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
