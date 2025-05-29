import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateForm: (state, action) => {
      const { name, value } = action.payload;
      state[name] = value;
    },

    submitForm: (state) => {
      console.log("Submitted", state);
    },

    resetForm: () => initialState,
  },
});

export default formSlice.reducer;

export const { updateForm, submitForm, resetForm } = formSlice.actions;
