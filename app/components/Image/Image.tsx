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
          <img alt={alt || ""} src={src} className={styles.image} />
        </a>
      ) : (
        <img alt={alt || ""} src={src} className={styles.image} />
      )}
      {showAltText && alt && <span>{alt}</span>}
    </div>
  );
}

export function ImageGrid({
  images,
  size = 300,
  showAltText = false,
}: {
  images: ImageProps[];
  size?: number;
  showAltText?: boolean;
}) {
  return (
    <div
      className={`${styles.grid} ${
        images.length === 1 ? styles.gridOne : styles.gridMany
      }`}
    >
      {images.map((image) => (
        <Image
          key={image.imageUrl}
          {...image}
          size={size}
          showAltText={showAltText}
        />
      ))}
    </div>
  );
}
