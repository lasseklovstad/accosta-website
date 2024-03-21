import {
  Links,
  Meta,
  MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
} from "@remix-run/react";
import { getPages } from "./sanity";
import { Header } from "./components/Header/Header";
import "./index.css";
import { Container } from "./components/Container/Container";
import { Footer } from "./components/Footer/Footer";

export const meta: MetaFunction = () => {
  return [{ title: "Accosta" }];
};

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useRouteLoaderData<typeof clientLoader>("root");
  return (
    <html lang="no">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="favicon.png"
          type="image/gif"
          sizes="16x16"
        ></link>
        <Meta />
        <Links />
      </head>
      <body>
        <Container>
          <Header
            links={
              data?.pages.map((p) => ({
                name: p.title,
                url: "/" + p.slug.current,
              })) ?? []
            }
          />
          {children}
          <Footer />
        </Container>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export async function clientLoader() {
  return { pages: await getPages() };
}

export default function App() {
  return <Outlet />;
}

export function HydrateFallback() {
  return <p>Laster...</p>;
}
