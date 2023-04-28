import compose from "compose-function";
import { withQuery } from "./with-query";
import { withStore } from "./with-store";

export const withProviders = compose(withQuery, withStore);