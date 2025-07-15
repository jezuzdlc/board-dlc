import { Outlet } from "react-router-dom";
import { Title } from "../../Components/Layout/Title/Title";
import { Nav } from "../../Components/Layout/Nav/Nav";
import { Header } from "../../Components/Layout/Header/Header";
import styles from './MainLayout.module.css'
import { Sidebar } from "../../Components/Sidebar/Sidebar";

export const MainLayout = () => {
  return (
    <>
      <Header>
        <Title/>
        <Nav />
      </Header>
      <main className={styles.main}>
      <Sidebar/>
      <Outlet />
      </main>
    </>
  );
};
