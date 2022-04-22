import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { getLocalStorageLanguage, LANGUAGE_CODES } from "../../i18n/i18n";
import { css } from "@emotion/css";
import MenuDesktop from "./MenuDesktop";
import MenuMobile from "./MenuMobile";

export interface FlexDisplay {
  display: string;
  justifyContent: string;
  alignItems: string;
}

export const flexDisplay: FlexDisplay = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const Nav = () => {
  const { i18n } = useTranslation();

  const [isMenuClick, setIsMenuClick] = useState<boolean>(false);

  const handleLanguageChange = () => {
    const localLanguage = getLocalStorageLanguage();
    let newLanguage = LANGUAGE_CODES.en;
    if (localLanguage === LANGUAGE_CODES.en) {
      newLanguage = LANGUAGE_CODES.jp;
    }
    i18n.changeLanguage(newLanguage);
  };

  const onMenuButtonClick = () => {
    setIsMenuClick((prevState) => !prevState);
  };

  return (
    <>
      <nav>
        <div
          className={css({
            ...flexDisplay,
            padding: "0.5rem 2rem",
          })}
        >
          <p>Tokped Anime</p>
          <MenuDesktop handleLanguageChange={handleLanguageChange} onMenuButtonClick={onMenuButtonClick} />
          <MenuMobile
            handleLanguageChange={handleLanguageChange}
            isMenuClick={isMenuClick}
            onMenuButtonClick={onMenuButtonClick}
          />
        </div>
      </nav>
    </>
  );
};
export default Nav;
