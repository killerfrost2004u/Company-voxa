import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
});

// Bypass sanity fetch if the project ID is not configured (e.g. placeholder) to prevent build crashes
const originalFetch = client.fetch.bind(client);
client.fetch = async (query, params, options) => {
  if (!projectId || projectId === "yoursanityid") {
    console.warn("Sanity projectId is not configured. Bypassing fetch.");
    return [];
  }
  return originalFetch(query, params, options);
};
