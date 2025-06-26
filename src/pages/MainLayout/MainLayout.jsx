import { Outlet } from "react-router-dom";
import { Title } from "../../Components/Layout/Title/Title";
import { Nav } from "../../Components/Layout/Nav/Nav";
import { Header } from "../../Components/Layout/Header/Header";

export const MainLayout = () => {
  return (
    <>
      <Header>
        <Title/>
        <Nav />
      </Header>
      <Outlet />
    </>
  );
};
