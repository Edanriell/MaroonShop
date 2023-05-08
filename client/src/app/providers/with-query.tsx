import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export const withQuery = (component: () => ReactNode) => () =>
	<QueryClientProvider client={queryClient}>{component()}</QueryClientProvider>;

withQuery.displayName = "ReactQueryProvider";
