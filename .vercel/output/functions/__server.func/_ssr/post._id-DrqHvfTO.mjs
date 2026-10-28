import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as Route } from "./router-h9ZDsfHi.mjs";
import { t as PostScreen } from "./post-screen-CmknK0Ia.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/post._id-DrqHvfTO.js
var import_jsx_runtime = require_jsx_runtime();
function EditPost() {
	const { id } = Route.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostScreen, { id });
}
//#endregion
export { EditPost as component };
