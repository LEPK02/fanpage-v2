/* Set dark and light theme strings, isDarkMode */
import { createSlice } from "@reduxjs/toolkit";

export const DARK = "dark";
export const LIGHT = "light";
export const DARK_COLOUR = "#212529";
export const LIGHT_COLOUR = "#f8f9fa";


const initialState = {
  isDarkMode: true,
  themePrimary: DARK,
  themeSecondary: LIGHT
};

export function changeBackground(color) {
  if (document.getElementById("root").style.background !== color) {
    document.getElementById("root").style.background = color;
  }
}

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setDarkTheme(state) {
      state.isDarkMode = true;
      state.themePrimary = DARK;
      state.themeSecondary = LIGHT;
      changeBackground(DARK_COLOUR);
    },
    setLightTheme(state) {
      state.isDarkMode = false;
      state.themePrimary = LIGHT;
      state.themeSecondary = DARK;
      changeBackground(LIGHT_COLOUR);
    },
  },
});

const { reducer, actions } = themeSlice;

export const { setDarkTheme, setLightTheme } = actions;
export default reducer;