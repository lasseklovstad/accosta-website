import styles from "./Image.module.css";

type ImageProps = {
  imageUrl: string;
  alt?: string;
  link?: string;
  size?: number;
  showAltText?: boolean;
};

export function Image({
  imageUrl,
  alt,
  link,
  size = 300,
  showAltText,
}: ImageProps) {
  const src = imageUrl + `?w=${size}`;
  return (
    <div className={styles.container}>
      {link ? (
        <a href={link} target="_blank" rel="noreferrer">
          <img alt={alt} src={src} style={{ maxWidth: "100%" }} />
        </a>
      ) : (
        <img alt={alt} src={src} style={{ maxWidth: "100%" }} />
      )}
      {showAltText && alt && <span>{alt}</span>}
    </div>
  );
}
