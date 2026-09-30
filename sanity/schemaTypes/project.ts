import { defineType, defineField } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
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
      name: "problem_en",
      title: "Problem (English)",
      type: "text",
    }),
    defineField({
      name: "problem_ar",
      title: "Problem (Arabic)",
      type: "text",
    }),
    defineField({
      name: "solution_en",
      title: "Solution (English)",
      type: "text",
    }),
    defineField({
      name: "solution_ar",
      title: "Solution (Arabic)",
      type: "text",
    }),
    defineField({
      name: "businessValue_en",
      title: "Business Value (English)",
      type: "text",
    }),
    defineField({
      name: "businessValue_ar",
      title: "Business Value (Arabic)",
      type: "text",
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title_en",
              title: "Feature Title (English)",
              type: "string",
            }),
            defineField({
              name: "title_ar",
              title: "Feature Title (Arabic)",
              type: "string",
            }),
            defineField({
              name: "description_en",
              title: "Description (English)",
              type: "text",
            }),
            defineField({
              name: "description_ar",
              title: "Description (Arabic)",
              type: "text",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "image",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: "title_en",
      media: "image",
    },
  },
});
