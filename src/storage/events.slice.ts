import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEvent } from "../components/EventCalendar/EventCalendar.tsx";
import { loadState } from "./storage.ts";

export const EVENTS_KEY = "events";

export interface EventsState {
  events: IEvent[] | undefined;
}

const initialState: EventsState = {
  events: loadState<EventsState>(EVENTS_KEY)?.events || [],
};

export const eventsSlice = createSlice({
  name: "events",
  initialState: initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<IEvent>) => {
      state.events?.push(action.payload);
    },
  },
});

export default eventsSlice.reducer;
export const eventActions = eventsSlice.actions;
