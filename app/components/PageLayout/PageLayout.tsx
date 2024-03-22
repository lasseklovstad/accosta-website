import styles from "./PageLayout.module.css";

type Props = {
  content: React.ReactNode;
  rightContent?: React.ReactNode;
};
export function PageLayout({ content, rightContent }: Props) {
  return (
    <main className={styles.container}>
      <article>{content}</article>
      {rightContent ? <aside>{rightContent}</aside> : null}
    </main>
  );
}
