"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./components.module.css";

const Header = () => {
  const pathname = usePathname();
  return (
    <div className={styles.header}>
      <Link href="/">
        <p className={pathname == "/" ? styles.active : ""}>RNAtango</p>
      </Link>
      <Link href="/about">
        <p className={pathname == "/about" ? styles.active : ""}>About</p>
      </Link>
      <Link href="/cite_us">
        <p className={pathname == "/cite_us" ? styles.active : ""}>Cite us</p>
      </Link>
      <Link href="/help">
        <p className={pathname == "/help" ? styles.active : ""}>Help</p>
      </Link>
    </div>
  );
};

export default Header;
