export default {
  name: "brand",
  title: "Brand",
  type: "document",
  fields: [
    { name: "brandName", title: "Brand Name", type: "string", validation: (R: { required: () => unknown }) => R.required() },
    { name: "website", title: "Website", type: "url" },
    { name: "contactEmail", title: "Contact Email", type: "string" },
    { name: "vertical", title: "Industry Vertical", type: "string" },
    { name: "contactPhone", title: "Contact Phone", type: "string" },
    { name: "notes", title: "Notes", type: "text" },
  ],
  preview: {
    select: { title: "brandName", subtitle: "vertical" },
  },
};
