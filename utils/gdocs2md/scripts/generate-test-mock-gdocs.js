import path from "path";
import { jekyllifyDocs } from "../src/jekyllUtils.js";
import { config } from "dotenv";
// Read .env file from directory where command is issued
config({ path: path.resolve(process.cwd(), ".env") });
import pkg from "../src/constants.js";
const { mockPluginOptions } = pkg;
jekyllifyDocs(mockPluginOptions);
