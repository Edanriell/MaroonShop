import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LoadingPage from "./loading";

const IndexPage = lazy(() => import("./index/index"));
const CatalogPage = lazy(() => import("./catalog/index"));
const ProductPage = lazy(() => import("./product/index"));
const LoginPage = lazy(() => import("./login/index"));
const RegistrationPage = lazy(() => import("./registration/index"));
const ProfilePage = lazy(() => import("./profile/index"));
const ProductsManagementPage = lazy(() => import("./products-management/index"));
const ShopHistoryPage = lazy(() => import("./shop-history/index"));
const AboutShopPage = lazy(() => import("./about-shop/index"));
const ShopListPage = lazy(() => import("./shop-list/index"));
const ContactsPage = lazy(() => import("./contacts/index"));
const NotFoundPage = lazy(() => import("./not-found/index"));

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
	{
		path: "/registration",
		element: (
			<Suspense fallback={<LoadingPage />}>
				<RegistrationPage />
			</Suspense>
		),
	},
	{
		path: "/profile",
		element: (
			<Suspense fallback={<LoadingPage />}>
				<ProfilePage />
			</Suspense>
		),
	},
	{
		path: "/products-management",
		element: (
			<Suspense fallback={<LoadingPage />}>
				<ProductsManagementPage />
			</Suspense>
		),
	},
	{
		path: "/shop-history",
		element: (
			<Suspense fallback={<LoadingPage />}>
				<ShopHistoryPage />
			</Suspense>
		),
	},
	{
		path: "/about-shop",
		element: (
			<Suspense fallback={<LoadingPage />}>
				<AboutShopPage />
			</Suspense>
		),
	},
	{
		path: "/shop-list",
		element: (
			<Suspense fallback={<LoadingPage />}>
				<ShopListPage />
			</Suspense>
		),
	},
	{
		path: "/contacts",
		element: (
			<Suspense fallback={<LoadingPage />}>
				<ContactsPage />
			</Suspense>
		),
	},
	{
		path: "*",
		element: (
			<Suspense fallback={<LoadingPage />}>
				<NotFoundPage />
			</Suspense>
		),
	},
]);

const Routing = () => <RouterProvider router={router} />;

export default Routing;
