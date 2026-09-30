import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemaTypes";
import { projectId, dataset } from "./sanity/env";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  title: "VOXA CMS",
  schema: {
    types: schemaTypes,
  },
  plugins: [structureTool()],
});
