import { FC, FormEvent, useEffect, useState } from "react";
import { Card, Layout, Row } from "antd";
import styles from "./Login.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootDispatch, RootState } from "../../storage/store.ts";
import { getUser } from "../../storage/user.slice.ts";
import { useNavigate } from "react-router-dom";

const Login: FC = () => {
  const dispatch = useDispatch<RootDispatch>();
  const navigate = useNavigate();
  const { auth, error } = useSelector((state: RootState) => state.user);
  const [formState, setFormState] = useState({
    password: true,
    username: true,
  });

  const [inputData, setInputData] = useState({
    password: "",
    username: "",
  });

  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  }, [auth]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let isValid = true;

    if (!inputData.username?.trim().length) {
      setFormState((state) => ({ ...state, username: false }));
    } else {
      setFormState((state) => ({ ...state, username: true }));
    }
    if (!inputData.password?.trim().length) {
      setFormState((state) => ({ ...state, password: false }));
    } else {
      setFormState((state) => ({ ...state, password: true }));
    }
    if (!isValid) {
      return;
    } else onSubmit();
  }

  function onSubmit() {
    dispatch(
      getUser({ username: inputData.username, password: inputData.password }),
    );
    setInputData(() => ({ username: "", password: "" }));
  }

  return (
    <Layout>
      <Row justify={"center"} align={"middle"} className={styles["h100"]}>
        <Card>
          <form className={styles["form"]} onSubmit={handleSubmit}>
            {error && (
              <div
                style={{
                  color: "white",
                  fontSize: "20px",
                  backgroundColor: "red",
                  borderRadius: "10px",
                  padding: "20px",
                  marginBottom: "30px",
                }}
              >
                {error}
              </div>
            )}
            <label htmlFor="name">Username</label>
            <input
              id="name"
              value={inputData.username}
              type="text"
              className={`${styles["input"]} ${formState.username ? "" : styles["invalid"]}`}
              onChange={(event) =>
                setInputData((current) => ({
                  ...current,
                  username: event.target.value,
                }))
              }
            />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              value={inputData.password}
              type="password"
              className={`${styles["input"]} ${formState.password ? "" : styles["invalid"]}`}
              onChange={(event) =>
                setInputData((current) => ({
                  ...current,
                  password: event.target.value,
                }))
              }
            />
            <button className={styles["btn"]}>Submit</button>
          </form>
        </Card>
      </Row>
    </Layout>
  );
};

export default Login;
