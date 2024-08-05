import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loadState } from "./storage.ts";
import { AxiosError } from "axios";
import UserService from "../api/UserService.ts";

export const AUTH_KEY = "auth-key";

export interface IUser {
  username: string;
  password: string;
}

export interface UserState {
  auth: boolean | undefined;
  user: IUser | undefined;
  error?: string;
}

export interface IUserPayload {
  username: string;
  password: string;
}

// Добавить получение JWT посредством доп. функции из localStorage
const initialState: UserState = {
  auth: loadState<UserState>(AUTH_KEY)?.auth,
  user: loadState<UserState>(AUTH_KEY)?.user,
  error: "",
};

export const getUser = createAsyncThunk(
  "user/get",
  async (params: { username: string; password: string }) => {
    try {
      const { data } = await UserService.getUsers();
      for (const person of data) {
        if (
          person.password === params.password &&
          person.username === params.username
        )
          return params;
      }
      return false;
    } catch (err) {
      if (err instanceof AxiosError) {
        throw new Error(err.message);
      }
    }
  },
);

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    logout: (state) => {
      state.auth = false;
      state.user = {} as IUser;
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      if (action.payload) {
        state.auth = true;
        state.user = action.payload;
        state.error = "";
      } else {
        state.auth = false;
        state.error = "User with that data doesn't exist";
      }
    });
    // Добавить обработку ошибки в случае, если запрос на сервер упал с ошибкой
    // -> изменить глобальное состояние ошибки для данного юзера и отобразить
    // соответствующее сообщение в форме логина/ регистрации
    // builder.addCase(getUser.rejected, (state, action) => {
    //   console.log(action);
    //   // state.error = action.payload
    // });
  },
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
