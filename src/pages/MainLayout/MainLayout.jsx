import { Outlet } from "react-router-dom";
import { Title } from "../../Layout/Title/Title";
import { Nav } from "../../Layout/Nav/Nav";
import { Header } from "../../Layout/Header/Header";
import { Sidebar } from "../../Layout/Sidebar/Sidebar";
import {Button} from "../../Components/Button/Button"
import styles from './MainLayout.module.css'
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
        <Button handleClick={handleSideBar} width="60"><FontAwesomeIcon icon={faBars}/></Button>
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
