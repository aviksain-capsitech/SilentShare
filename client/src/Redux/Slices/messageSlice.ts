import { createSlice } from "@reduxjs/toolkit";

export interface MessageType {
  id: string,
  owner: string,
  content: string,
  createdAt: Date,
  updatedAt: Date
}

export interface CounterState {
  messages: Array<MessageType>;
}

const initialState: CounterState = {
  messages: [],
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    // saves the all messages of the user
    saveMessages: (state, action) => {
      state.messages = Array.isArray(action.payload) ? action.payload : [];
    },

    // if user deletes a message
    deleteMessage: (state, action) => {
      state.messages = state.messages.filter((msg) => msg.id !== action.payload);
    },
  },
});

export const { saveMessages, deleteMessage } = messageSlice.actions;

export default messageSlice.reducer;