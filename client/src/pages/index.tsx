import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LoadingPage from "./loading";

const IndexPage = lazy(() => import("./index/index"));
const CatalogPage = lazy(() => import("./catalog/index"));
const ProductPage = lazy(() => import("./product/index"));
const LoginPage = lazy(() => import("./login/index"));

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<Suspense fallback={<LoadingPage />}>
				<IndexPage />
			</Suspense>
		),
	},
	{
		path: "/catalog",
		element: (
			<Suspense fallback={<LoadingPage />}>
				<CatalogPage />
			</Suspense>
		),
	},
	{
		path: "/product/:productId",
		element: (
			<Suspense fallback={<LoadingPage />}>
				<ProductPage />
			</Suspense>
		),
	},
	{
		path: "/login",
		element: (
			<Suspense fallback={<LoadingPage />}>
				<LoginPage />
			</Suspense>
		),
	},
]);

const Routing = () => <RouterProvider router={router} />;

export default Routing;
