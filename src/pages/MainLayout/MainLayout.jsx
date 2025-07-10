import { Outlet } from "react-router-dom";
import { Title } from "../../Components/Layout/Title/Title";
import { Nav } from "../../Components/Layout/Nav/Nav";
import { Header } from "../../Components/Layout/Header/Header";
import styles from './MainLayout.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck, faTable } from "@fortawesome/free-solid-svg-icons";

export const MainLayout = () => {
  return (
    <>
      <Header>
        <Title/>
        <Nav />
      </Header>
      <main className={styles.main}>
        <nav className={styles.nav}>
          <FontAwesomeIcon icon={faListCheck}/>
          <FontAwesomeIcon icon={faTable}/>
        </nav>
      <Outlet />
      </main>
    </>
  );
};
