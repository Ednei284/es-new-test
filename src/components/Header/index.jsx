import { Link, NavLink } from "react-router-dom";
import { Logo } from "../Logo";
import styles from "./styles.module.css";

import {
  FaShoppingCart,
  FaHome,
  FaStoreAlt,
  FaInfoCircle,
  FaNewspaper,
  FaMapMarkedAlt,
} from "react-icons/fa";
import { useRef } from "react";

export function Header() {
  const headerRef = useRef(null);

  return (
    <header id="header" ref={headerRef} className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <div className={styles.logoWrapper}>
          <Logo />
        </div>
        <div className={styles.headerText}>
          <p className={styles.paragr}>A economia solidária acontece em </p>
          <p className={styles.paragr}>Mogi das Cruzes.</p>
        </div>

        <div className={styles.menu}>
          <ul className={styles.menuList}>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.menuLink} ${styles.active}`
                    : styles.menuLink
                }
              >
                <FaHome />
                <span className={styles.menuLinkText}>Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/empreendimentos"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.menuLink} ${styles.active}`
                    : styles.menuLink
                }
              >
                <FaStoreAlt />
                <span className={styles.menuLinkText}>Empreendimentos</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/noticias"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.menuLink} ${styles.active}`
                    : styles.menuLink
                }
              >
                <FaNewspaper />
                <span className={styles.menuLinkText}>Notícias</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/onde"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.menuLink} ${styles.active}`
                    : styles.menuLink
                }
              >
                <FaMapMarkedAlt />
                <span className={styles.menuLinkText}>Comercialização</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
