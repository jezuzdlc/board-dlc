import { Outlet } from "react-router-dom";

import {Button} from "../../Components/common/Button/Button"
import styles from './MainLayout.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useState } from "react";
import { Header } from "../../Components/Layout/Header/Header";
import { Title } from "../../Components/Layout/Title/Title";
import { Nav } from "../../Components/Layout/Nav/Nav";
import { Sidebar } from "../../Components/Layout/Sidebar/Sidebar";

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
