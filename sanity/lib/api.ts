import { client } from './client';
import { ALL_ARTICLES_QUERY, ALL_PROJECTS_QUERY } from './queries';
import { articles as staticArticles } from '@/data/articles';
import { projects as staticProjects } from '@/data/projects';

export async function getArticles() {
  try {
    const sanityArticles = await client.fetch(ALL_ARTICLES_QUERY);
    if (sanityArticles && sanityArticles.length > 0) {
      return sanityArticles;
    }
  } catch (error) {
    console.error("Failed to fetch articles from Sanity:", error);
  }
  // Fallback to static mock data if Sanity is empty or fails
  return staticArticles;
}

export async function getProjects() {
  try {
    const sanityProjects = await client.fetch(ALL_PROJECTS_QUERY);
    if (sanityProjects && sanityProjects.length > 0) {
      return sanityProjects;
    }
  } catch (error) {
    console.error("Failed to fetch projects from Sanity:", error);
  }
  // Fallback to static mock data if Sanity is empty or fails
  return staticProjects;
}
