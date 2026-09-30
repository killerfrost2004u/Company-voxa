import { defineType, defineField } from "sanity";

export const article = defineType({
  name: "article",
  title: "Article",
  type: "document",
  fields: [
    defineField({
      name: "title_en",
      title: "Title (English)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title_ar",
      title: "Title (Arabic)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title_en",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category_en",
      title: "Category (English)",
      type: "string",
    }),
    defineField({
      name: "category_ar",
      title: "Category (Arabic)",
      type: "string",
    }),
    defineField({
      name: "excerpt_en",
      title: "Excerpt (English)",
      type: "text",
    }),
    defineField({
      name: "excerpt_ar",
      title: "Excerpt (Arabic)",
      type: "text",
    }),
    defineField({
      name: "content_en",
      title: "Content (English)",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "content_ar",
      title: "Content (Arabic)",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "image",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
    }),
  ],
  preview: {
    select: {
      title: "title_en",
      media: "image",
    },
  },
});
