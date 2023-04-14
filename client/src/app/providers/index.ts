import compose from "compose-function";
// Importing compose function which helps us wrap all providers in one peace.
// For more info check github: https://github.com/stoeffel/compose-function.
import { withRouter } from "./with-router";
// Importing router provider.

// TODO add missing providers when needed (query and redux)

export const withProviders = compose(withRouter);
