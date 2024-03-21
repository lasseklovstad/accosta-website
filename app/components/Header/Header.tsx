import { NavLink } from "@remix-run/react";
import styles from "./Header.module.css";

type Props = {
  links: { name: string; url: string }[];
};

export function Header({ links }: Props) {
  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <ul>
          {links.map((link) => (
            <li key={link.url}>
              <NavLink
                to={link.url}
                className={({ isActive }) => (isActive ? styles.active : "")}
                prefetch="intent"
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.logoContainer}>
        <img className={styles.logo} alt="" src="/logo.png" />
      </div>
    </header>
  );
}
