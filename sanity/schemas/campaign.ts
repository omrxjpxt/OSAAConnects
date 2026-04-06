export default {
  name: "campaign",
  title: "Campaign",
  type: "document",
  fields: [
    { name: "title", title: "Campaign Title", type: "string" },
    { name: "brief", title: "Campaign Brief", type: "text" },
    { name: "brand", title: "Brand", type: "reference", to: [{ type: "brand" }] },
    { name: "creators", title: "Creators", type: "array", of: [{ type: "reference", to: [{ type: "creator" }] }] },
    { name: "deliverables", title: "Deliverables", type: "text" },
    { name: "timeline", title: "Timeline", type: "string" },
    {
      name: "status",
      title: "Campaign Status",
      type: "string",
      options: {
        list: [
          { title: "Pitched", value: "pitched" },
          { title: "Negotiating", value: "negotiating" },
          { title: "Live", value: "live" },
          { title: "Completed", value: "completed" },
        ],
        layout: "radio",
      },
      initialValue: "pitched",
    },
  ],
  preview: {
    select: { title: "title", subtitle: "status" },
  },
};
