// Creator schema for Sanity CMS
export default {
  name: "creator",
  title: "Creator",
  type: "document",
  fields: [
    { name: "name", title: "Full Name", type: "string", validation: (R: { required: () => unknown }) => R.required() },
    { name: "handle", title: "Instagram Handle", type: "string", validation: (R: { required: () => unknown }) => R.required() },
    { name: "igLink", title: "Instagram Profile URL", type: "url" },
    { name: "followers", title: "Follower Count", type: "number" },
    { name: "avgViews", title: "Average Reel Views", type: "number" },
    {
      name: "niches",
      title: "Content Niches",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          "Fashion", "Tech", "Fitness", "Beauty", "Food", "Travel",
          "AI", "Finance", "Gaming", "Music", "Lifestyle", "Education",
        ],
      },
    },
    { name: "bio", title: "Bio", type: "text" },
    {
      name: "avatar",
      title: "Profile Photo",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "mediaGallery",
      title: "Media Gallery",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    },
    {
      name: "rates",
      title: "Rates",
      type: "object",
      fields: [
        { name: "reelRate", title: "Reel Rate (₹)", type: "number" },
        { name: "storyRate", title: "Story Rate (₹)", type: "number" },
        { name: "postRate", title: "Post Rate (₹)", type: "number" },
        { name: "currency", title: "Currency", type: "string", initialValue: "INR" },
      ],
    },
    { name: "location", title: "Location / City", type: "string" },
    { name: "languages", title: "Languages", type: "array", of: [{ type: "string" }] },
    { name: "tags", title: "Tags", type: "array", of: [{ type: "string" }] },
    { name: "availability", title: "Available for Campaigns", type: "boolean", initialValue: true },
    { name: "phone", title: "Phone (private)", type: "string" },
    { name: "email", title: "Email (private)", type: "string" },
  ],
  preview: {
    select: { title: "name", media: "avatar", subtitle: "handle" },
    prepare({ title, media, subtitle }: { title: string; media: unknown; subtitle: string }) {
      return { title, media, subtitle: `@${subtitle}` };
    },
  },
};
