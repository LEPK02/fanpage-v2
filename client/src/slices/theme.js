/* Set dark and light theme strings, isDarkMode */
import { createSlice } from "@reduxjs/toolkit";

export const DARK = "dark";
export const LIGHT = "light";

const initialState = {
  isDarkMode: true,
  themePrimary: DARK,
  themeSecondary: LIGHT
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setDarkTheme(state) {
      state.isDarkMode = true;
      state.themePrimary = DARK;
      state.themeSecondary = LIGHT;
    },
    setLightTheme(state) {
      state.isDarkMode = false;
      state.themePrimary = LIGHT;
      state.themeSecondary = DARK;
    },
  },
});

const { reducer, actions } = themeSlice;

export const { setDarkTheme, setLightTheme } = actions;
export default reducer;