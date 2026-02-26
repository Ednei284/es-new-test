import { Link } from "react-router-dom";
import { Divider2 } from "../Divider";
import styles from "./styles.module.css";

export const NavInter = ({ path, name }) => {
  return (
    <div className={`${styles.navVendor} `}>
      <Link className={`${styles.btnCategory} button`} to={path}>
        Voltar
      </Link>
      {name && (
        <Divider2>
          <p className={`${styles.titleCategory}`}>{name} </p>
        </Divider2>
      )}
    </div>
  );
};
