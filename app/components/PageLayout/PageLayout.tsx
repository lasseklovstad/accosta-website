import styles from "./PageLayout.module.css";

type Props = {
  pageTitle: string;
  content: React.ReactNode;
  rightContent?: React.ReactNode;
};
export function PageLayout({ content, rightContent, pageTitle }: Props) {
  return (
    <main className={styles.container}>
      <h1 className="sr-only">{pageTitle}</h1>
      <article>{content}</article>
      {rightContent ? <aside>{rightContent}</aside> : null}
    </main>
  );
}
