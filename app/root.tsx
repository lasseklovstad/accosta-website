import {
  Links,
  Meta,
  MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  useRouteLoaderData,
} from "@remix-run/react";
import { getPages } from "./sanity";
import { Header } from "./components/Header/Header";
import "./index.css";
import { Container } from "./components/Container/Container";
import { Footer } from "./components/Footer/Footer";
import { LoaderFunctionArgs } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Accosta" },
    {
      name: "description",
      content:
        "Accosta AS er et regnskapsbyrå som tilbyr regnskapsføring og konsulenttjenester innen økonomi og skatt. Vi ønsker å bli din samarbeidspartner på økonomi og regnskap og tilbyr god fagkunnskap og fleksible løsninger.",
    },
  ];
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

export async function clientLoader({ request }: LoaderFunctionArgs) {
  return { pages: await getPages(request.signal) };
}

export default function App() {
  return <Outlet />;
}

export function HydrateFallback() {
  return <p>Laster...</p>;
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
