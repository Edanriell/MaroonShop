import compose from "compose-function";
import { withRouter } from "./with-router";
// TODO add missing providers when needed (query and redux)

export const withProviders = compose(withRouter);
