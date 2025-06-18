import { Badge } from "../UI/Badge/Badge";
import styles from "./Card.module.css";
import { IconEyePlus, IconMessage2, IconClock} from "@tabler/icons-react";

export const Card = () => {
  return (
    <div className={styles.card}>
      <div className={styles["title-container"]}>
        <h3 className={styles.title}>title</h3>
        <Badge type={"high"} />
      </div>
      <div className={styles.info}>
        <p className={styles.date}>10/12/24</p>
        <div className={styles.actions}>
          <IconClock stroke={2} />
          <IconMessage2 stroke={2} />
          <IconEyePlus stroke={2} />
        </div>
      </div>
    </div>
  );
};
