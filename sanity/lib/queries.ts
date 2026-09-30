import { groq } from 'next-sanity';

export const ALL_ARTICLES_QUERY = groq`
  *[_type == "article"] | order(publishedAt desc) {
    "id": slug.current,
    "title": {
      "en": title_en,
      "ar": title_ar
    },
    "excerpt": {
      "en": excerpt_en,
      "ar": excerpt_ar
    },
    "category": {
      "en": category_en,
      "ar": category_ar
    },
    "date": {
      "en": publishedAt,
      "ar": publishedAt
    },
    "image": image.asset->url,
    "content": {
      "en": content_en,
      "ar": content_ar
    }
  }
`;

export const ALL_PROJECTS_QUERY = groq`
  *[_type == "project"] {
    "slug": slug.current,
    "title": {
      "en": title_en,
      "ar": title_ar
    },
    "category": {
      "en": category_en,
      "ar": category_ar
    },
    "problem": {
      "en": problem_en,
      "ar": problem_ar
    },
    "solution": {
      "en": solution_en,
      "ar": solution_ar
    },
    "businessValue": {
      "en": businessValue_en,
      "ar": businessValue_ar
    },
    "image": image.asset->url,
    features[]{
      "title": {
        "en": title_en,
        "ar": title_ar
      },
      "description": {
        "en": description_en,
        "ar": description_ar
      }
    }
  }
`;
