"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./components.module.css";
import Logo from "../assets/logornatango.svg";
import { useState } from "react";
import { Button } from "antd";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";

const Header = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1200px)" });
  return <>{isDesktop ? <DesktopHeader /> : <HeaderMobile />}</>;
};

export default Header;
const DesktopHeader = () => {
  const pathname = usePathname();
  return (
    <div className={styles.background}>
      <div className={styles.header}>
        <Link href="/">
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

const HeaderMobile = () => {
  const pathname = usePathname();
  const [showMenu, setShowMenu] = useState(false);

  const handleClick = () => {
    setShowMenu(false);
  };

  return (
    <>
      <div className={styles.background}>
        <div className={styles.header}>
          <Link href="/">
            <Image src={Logo} alt="RNAtango" height={40} />
          </Link>
          <Button
            icon={<MenuOutlined />}
            type="text"
            size="large"
            onClick={() => setShowMenu(true)}
          />
        </div>
      </div>
      <div
        className={`${styles.flyoutMenu} ${
          showMenu === true ? styles.flyoutMenuShow : styles.flyoutMenuHide
        }`}
      >
        <div
          style={{
            display: "flex",
            textAlign: "center",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              icon={<CloseOutlined />}
              type="text"
              size="large"
              onClick={() => setShowMenu(false)}
            />
          </div>
          <Link href="/" onClick={handleClick}>
            <h4 className={pathname == "/" ? styles.active : ""}>Home</h4>
          </Link>
          <Link href="/about" onClick={handleClick}>
            <h4 className={pathname == "/about" ? styles.active : ""}>About</h4>
          </Link>
          <Link href="/cite_us" onClick={handleClick}>
            <h4 className={pathname == "/cite_us" ? styles.active : ""}>
              Cite us
            </h4>
          </Link>
          <Link href="/help" onClick={handleClick}>
            <h4 className={pathname == "/help" ? styles.active : ""}>Help</h4>
          </Link>
        </div>
      </div>
    </>
  );
};
