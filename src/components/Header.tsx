"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./components.module.css";
import Logo from "../assets/logornatango.svg";

const Header = () => {
  const pathname = usePathname();
  return (
    <div className={styles.background}>
      <div className={styles.header}>
        <Link href="/">
          {/* <p className={pathname == "/" ? styles.active : ""}>RNAtango</p> */}
          <Image src={Logo} alt="RNAtango" height={40} />
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
    </div>
  );
};

export default Header;
