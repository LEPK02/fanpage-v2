import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeBackground, DARK_COLOUR, LIGHT_COLOUR, setDarkTheme, setLightTheme } from "../slices/theme";

import "./ThemeControl.css";

import Button from 'react-bootstrap/Button';

const ThemeControl = () => {
  // Theme via Redux
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const themePrimary = useSelector((state) => state.theme.themePrimary);
  isDarkMode ? changeBackground(DARK_COLOUR) : changeBackground(LIGHT_COLOUR);

  // Update Redux store
  const dispatch = useDispatch();

  const setDark = useCallback(() => {
    dispatch(setDarkTheme());
  }, [dispatch]);
  const setLight = useCallback(() => {
    dispatch(setLightTheme());
  }, [dispatch]);

  return (
      <>
        <Button
          id="themeSwitch"
          className="bg-transparent border-0"
          onClick={() => {
            (() => {
              isDarkMode ? setLight() : setDark();
              document.getElementById("root").style = (isDarkMode ? `background: ${LIGHT_COLOUR}` : `background: ${DARK_COLOUR}`);
              document.body.style = (isDarkMode ? `background: ${LIGHT_COLOUR}` : `background: ${DARK_COLOUR}`);
            })(isDarkMode);
          }}
        >
          <img className={`${themePrimary}-switch`} src={"/assets/images/sun.png"} alt="Sun logo" />
        </Button>
      </>
    );
}

export default ThemeControl;