import { PortableTextBlock } from "@portabletext/react";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "9joo5whm",
  dataset: "production",
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: "2024-03-20", // use current date (YYYY-MM-DD) to target the latest API version
  // token: process.env.SANITY_SECRET_TOKEN // Only if you want to update content with the client
});

type Slug = {
  current: string;
};

// uses GROQ to query content: https://www.sanity.io/docs/groq
export async function getPages(): Promise<{ title: string; slug: Slug }[]> {
  return client.fetch(
    `*[_type == "page"] | order(order asc) {
    title,
    slug,
    order
  }`
  );
}

export async function getPageContent(slug: string | undefined): Promise<{
  title: string;
  content: PortableTextBlock;
  sideContent: PortableTextBlock;
}> {
  return client.fetch(
    `*[_type == "page" && slug.current == "${slug}"]{
      title,
      slug,
      content[]{
        "images": lineImages[]->{ "imageUrl" : image.asset -> url, alt, link, size, showAltText },
        ...
      },
      sideContent[]{
        "images": lineImages[]->{ "imageUrl" : image.asset -> url, alt, link, size, showAltText },
        ...
      }
    }[0]`
  );
}
