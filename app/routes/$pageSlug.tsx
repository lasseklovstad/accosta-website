import { PortableText } from "@portabletext/react";
import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ComponentProps } from "react";
import { PageLayout } from "~/components/PageLayout/PageLayout";
import { TextBlock } from "~/components/TextBlock/TextBlock";
import { ImageGrid } from "~/components/Image/Image";
import { getPageContent } from "~/sanity";
import { NotFound } from "~/components/NotFound/NotFound";

export const meta: MetaFunction<typeof clientLoader> = ({ data }) => {
  const title = data?.page ? "Accosta | " + data?.page.title : "Accosta";
  return [
    { title },
    {
      name: "description",
      content:
        "Accosta AS er et regnskapsbyrå som tilbyr regnskapsføring og konsulenttjenester innen økonomi og skatt. Vi ønsker å bli din samarbeidspartner på økonomi og regnskap og tilbyr god fagkunnskap og fleksible løsninger.",
    },
  ];
};

export async function clientLoader({
  request,
  params: { pageSlug },
}: LoaderFunctionArgs) {
  return { page: await getPageContent(pageSlug, request.signal) };
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

  if (page === null) {
    return <PageLayout content={<NotFound />} />;
  }

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
