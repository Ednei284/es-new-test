import { Link } from "react-router-dom";
import { Divider2 } from "../Divider";
import styles from "./styles.module.css";

export const NavInter = ({ path, name }) => {
  return (
    <div className={`${styles.navVendor} `}>
      {name && (
        <Link className={`${styles.btnCategory} button`} to={path}>
          Voltar para {name}
        </Link>
      )}
    </div>
  );
};
