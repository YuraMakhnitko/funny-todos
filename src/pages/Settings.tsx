import React from "react";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";

import { useDispatch, useSelector } from "react-redux";

import { VolumeSlider } from "../components/VolumeSlider";
import {
  setLanguage,
  setAuth,
  RootState,
  Language,
  setTabIndex,
  setActiveTodos,
  setCompletedTodos,
} from "../redux";

import useSound from "use-sound";
import { sounds } from "../settings/sounds";

export const Settings: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state: RootState) => state.auth);
  const { language } = useSelector((state: RootState) => state.settings);
  const volume = useSelector((state: RootState) => state.settings.soundsVolume);

  const [toggleSound] = useSound(sounds.toggle, { volume });
  const [submitSound] = useSound(sounds.submitSound, { volume });

  const enLang = language === "en" ? { color: "#fff" } : { color: "#61dafb" };
  const uaLang = language !== "en" ? { color: "#fff" } : { color: "#61dafb" };
  const userNameTitle = language === Language.ua ? "Ім'я:" : "Name:";
  const languageTitle = language === Language.ua ? "Мова:" : "Language:";
  const logoutButtonTitle = language === Language.ua ? "Вийти" : "Logout";
  const logoutMessage =
    language === Language.ua
      ? "Вийти з акаунту?"
      : "Are you sure you want to logout?";

  const handleChangeLanguage = (event: React.SyntheticEvent): void => {
    dispatch(setLanguage(event.currentTarget.id));
    toggleSound();
  };

  const onLogoutClick = (): void => {
    if (window.confirm(logoutMessage)) {
      dispatch(setAuth(false));
      submitSound();
      navigate("/");
      dispatch(setTabIndex(0));
      dispatch(setActiveTodos([]));
      dispatch(setCompletedTodos([]));
      window.localStorage.removeItem("token");
    }
  };

  return (
    <div className="todo-settings">
      {isAuth && (
        <p className="todo-settings__text">
          {userNameTitle} <span>{user.name}</span>
        </p>
      )}
      <div className="todo-settings__devider"></div>
      {isAuth && (
        <p className="todo-settings__text">
          Email: <span>{user.email}</span>
        </p>
      )}
      <div className="todo-settings__devider"></div>
      <div className="todo-settings__language-box">
        <p className="todo-settings__label">{languageTitle}</p>
        <div className="settings-toggle">
          <Button id="en" sx={enLang} onClick={handleChangeLanguage}>
            EN
          </Button>
          <Button id="ua" sx={uaLang} onClick={handleChangeLanguage}>
            UA
          </Button>
        </div>
      </div>
      <div className="todo-settings__devider"></div>
      <VolumeSlider />
      <div className="todo-settings__devider"></div>
      {isAuth && (
        <button className="todo__button" onClick={onLogoutClick}>
          {logoutButtonTitle}
        </button>
      )}
    </div>
  );
};
