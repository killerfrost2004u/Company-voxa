import { type SchemaTypeDefinition } from "sanity";
import { article } from "./article";
import { project } from "./project";

export const schemaTypes: SchemaTypeDefinition[] = [article, project];
