import { register } from "node:module";
import { pathToFileURL } from "node:url";

register("./node-jsx-loader.js", pathToFileURL("./"));

import("./server.js");
