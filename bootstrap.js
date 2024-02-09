// bootstrap.js
import { register } from "node:module";
import { pathToFileURL } from "node:url";

// Replace './node-jsx-loader.js' with the correct path to your loader if necessary
register("./node-jsx-loader.js", pathToFileURL("./"));

// Now import your server to start it
import("./server.js");
