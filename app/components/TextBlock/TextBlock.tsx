import styles from "./TextBlock.module.css";

type Props = {
  title: string;
  text: string;
};

export function TextBlock({ text, title }: Props) {
  return (
    <article className={styles.box}>
      <h2 className={styles.title}>{title}</h2>
      {text.split("\n").map((text, index) => (
        <p key={index}>{text}</p>
      ))}
    </article>
  );
}
