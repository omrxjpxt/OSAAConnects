export default {
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (R: { required: () => unknown }) => R.required() },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (R: { required: () => unknown }) => R.required() },
    { name: "excerpt", title: "Excerpt", type: "text", rows: 3 },
    { name: "featuredImage", title: "Featured Image", type: "image", options: { hotspot: true } },
    { name: "author", title: "Author", type: "string", initialValue: "OSAA Connects Team" },
    { name: "publishedAt", title: "Published At", type: "datetime" },
    { name: "contentBlocks", title: "Content", type: "array", of: [{ type: "block" }, { type: "image", options: { hotspot: true } }] },
  ],
  orderings: [{ title: "Published Date, Newest", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] }],
  preview: {
    select: { title: "title", media: "featuredImage", subtitle: "publishedAt" },
  },
};
