/* eslint-disable react/display-name */

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export const withQuery = (component: () => ReactNode) => () =>
	<QueryClientProvider client={queryClient}>{component()}</QueryClientProvider>;
