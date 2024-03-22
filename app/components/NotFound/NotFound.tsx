import { Link } from "@remix-run/react";
import styles from "./NotFound.module.css";

export function NotFound() {
  return (
    <div className={styles.container}>
      <h2>Denne siden finnes ikke lenger</h2>
      <Link to={"/"}>Gå til forsiden</Link>
    </div>
  );
}
