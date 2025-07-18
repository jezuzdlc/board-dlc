import { Outlet } from "react-router-dom";
import { Title } from "../../Components/Layout/Title/Title";
import { Nav } from "../../Components/Layout/Nav/Nav";
import { Header } from "../../Components/Layout/Header/Header";
import styles from './MainLayout.module.css'
import { Sidebar } from "../../Components/Sidebar/Sidebar";
import { Button } from "../../Components/Layout/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useState } from "react";

export const MainLayout = () => {
  const [isSideBarOpen,setIsSideBarOpen] = useState(false);

  const handleSideBar = useCallback(()=>{
    setIsSideBarOpen(state=>!state)
  },[])
  return (
    <>
      <Header>
        <Title/>
        <div className={styles.button} >
        <Button handleClick={handleSideBar}><FontAwesomeIcon icon={faBars}/></Button>
        </div>
        <Nav />
      </Header>
      <main className={styles.main}>
      <Sidebar isOpen={isSideBarOpen}/>
      <Outlet />
      </main>
    </>
  );
};
