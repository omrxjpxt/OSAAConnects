import creator from "./schemas/creator";
import brand from "./schemas/brand";
import campaign from "./schemas/campaign";
import post from "./schemas/post";

export default {
  name: "osaa-connects",
  title: "OSAA Connects CMS",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  plugins: [],
  schema: {
    types: [creator, brand, campaign, post],
  },
};
