import { lazy, Suspense } from "react";
// Importing lazy function also Suspense component.
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// Importing createBrowserRouter function ;

// TODO add beautiful spinner.

const IndexPage = lazy(() => import("./index/index"));
// Lazy importing main (index) page.
// lazy function lets you defer loading component’s code until it is rendered for the first time.
// For more info on lazy check out docs: https://react.dev/reference/react/lazy.

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
// createBrowserRouter uses the DOM History API to update the URL and manage the history stack.
// Recommended router for all React Router web projects.
// With the help of this function we create and manage our routes.
// For more check official docs: https://reactrouter.com/en/main/routers/create-browser-router.
// Using the createBrowserRouter function and RouterProvider component is a modern
// and recommended way to create our app's routing nowadays.
// But, you are also allowed to go for more classical approach using a <BrowserRouter>, <Routes> and <Route> components.
// There are some downsides for using this approach, but for most people they are miserable.
// So you can choose modern or classical routing it really doesn't matter, at least for now.
// To use classical approach, <BrowserRouter> component must be imported in app/providers
// with-router.tsx file, obviously you need make to make a HOC.
// In this file pages/index.tsx you need to get rid of createBrowserRouter function and RouterProvider component, also
// router variable and Routing function.
// You need to import Routes component and Route component.
// And eventually you will be using them like this:
// export const Routing = () => {
// 	return (
// 	  <Routes>
// 		<Route path="/" element={<SomeGoodLookingPage />} />
// 	  </Routes>
// 	);
// };

function Routing() {
	return <RouterProvider router={router} />;
}
// Our routing function which eventually will be exported.

export default Routing;
// Exporting Routing component.
