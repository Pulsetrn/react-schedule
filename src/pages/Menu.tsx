import Navbar from "../components/Navbar.tsx";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";

function Menu() {
  return (
    <Layout>
      <Navbar></Navbar>
      <Layout.Content>
        <Outlet></Outlet>
      </Layout.Content>
    </Layout>
  );
}

export default Menu;
