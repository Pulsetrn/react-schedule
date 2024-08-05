import { Layout, Menu, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootDispatch, RootState } from "../storage/store.ts";
import { userActions } from "../storage/user.slice.ts";

function Navbar() {
  // добавить получение факта авторизованности пользователя из глобального состояния
  const { auth, user } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch<RootDispatch>();

  return (
    <Layout.Header>
      <Row justify={"end"}>
        {auth ? (
          <>
            <div style={{ color: "white", marginRight: "10px" }}>
              {user?.username}
            </div>
            <Menu theme={"dark"} mode={"horizontal"}>
              <Menu.Item key={1} onClick={() => dispatch(userActions.logout())}>
                Log out
              </Menu.Item>
              {/*<Menu.Item key={2}>CalendarPage</Menu.Item>*/}
            </Menu>
          </>
        ) : (
          <Menu theme={"dark"} mode={"horizontal"}>
            <>
              <Menu.Item key={1} onClick={() => navigate("/auth")}>
                Log in
              </Menu.Item>
              {/*<Menu.Item key={2}>CalendarPage</Menu.Item>*/}
            </>
          </Menu>
        )}
      </Row>
    </Layout.Header>
  );
}

export default Navbar;
