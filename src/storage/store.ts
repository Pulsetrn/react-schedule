import { configureStore } from "@reduxjs/toolkit";
import { AUTH_KEY, userSlice, UserState } from "./user.slice.ts";
import { saveState } from "./storage.ts";
import { EVENTS_KEY, eventsSlice, EventsState } from "./events.slice.ts";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    events: eventsSlice.reducer,
  },
});

store.subscribe(() => {
  saveState<UserState>(AUTH_KEY, {
    auth: store.getState().user.auth,
    // коллизия имен
    user: store.getState().user.user,
  });
  saveState<EventsState>(EVENTS_KEY, {
    events: store.getState().events.events,
  });
});

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
