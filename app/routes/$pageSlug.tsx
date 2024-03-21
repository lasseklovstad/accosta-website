import { PortableText } from "@portabletext/react";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ComponentProps } from "react";
import { PageLayout } from "~/components/PageLayout/PageLayout";
import { TextBlock } from "~/components/TextBlock/TextBlock";
import { Image, ImageGrid } from "~/components/Image/Image";
import { getPageContent } from "~/sanity";

export async function clientLoader({
  params: { pageSlug },
}: LoaderFunctionArgs) {
  return { page: await getPageContent(pageSlug) };
}

const components: ComponentProps<typeof PortableText>["components"] = {
  types: {
    textBlock: ({ value }) => <TextBlock {...value} />,
    blockImage: ({ value }) => (
      <ImageGrid
        images={value.images}
        size={value.size}
        showAltText={value.showAltText}
      />
    ),
  },
};

export default function Page() {
  const { page } = useLoaderData<typeof clientLoader>();
  return (
    <PageLayout
      content={<PortableText value={page.content} components={components} />}
      rightContent={
        page.sideContent ? (
          <PortableText value={page.sideContent} components={components} />
        ) : null
      }
    />
  );
}
