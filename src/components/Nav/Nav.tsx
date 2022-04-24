import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { getLocalStorageLanguage, LANGUAGE_CODES } from "../../i18n/i18n";
import { css } from "@emotion/css";
import MenuDesktop from "./MenuDesktop";
import MenuMobile from "./MenuMobile";
import styled from "@emotion/styled";

const NavWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 2rem;
  background: white;
  z-index: 410;
`;

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
      <NavWrapper>
        <p>Tokped Anime</p>
        <MenuDesktop handleLanguageChange={handleLanguageChange} onMenuButtonClick={onMenuButtonClick} />
        <MenuMobile
          handleLanguageChange={handleLanguageChange}
          isMenuClick={isMenuClick}
          onMenuButtonClick={onMenuButtonClick}
        />
      </NavWrapper>
    </>
  );
};
export default Nav;
