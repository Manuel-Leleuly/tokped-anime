import Button from "@atlaskit/button";
import { css } from "@emotion/css";
import styled from "@emotion/styled";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { mobileWidth } from "../../constants/constants";
import { t } from "../../i18n/i18n";

interface Props {
  handleLanguageChange: () => void;
  isMenuClick: boolean;
  onMenuButtonClick: () => void;
}

const MenuMobileWrapper = styled.div`
  max-width: 200px;
  height: 100vh;
  display: none;
  flex-direction: column;
  justify-content: space-around;
  align-items: start;
  padding-left: 20px;
  position: absolute;
  z-index: 500;
  top: 0;
  left: -210px;
  background: white;
  -webkit-transition: transform 1s ease-in-out;
  transition: transform 0.5s ease-in-out;

  @media (max-width: ${mobileWidth}) {
    display: flex;
  }
`;

const MenuOverlay = styled.div`
  background: black;
  opacity: 0.5;
  position: absolute;
  z-index: 499;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const MenuAppear = css`
  transform: translateX(210px);
  -webkit-transition: transform 1s ease-in-out;
  transition: transform 0.5s ease-in-out;
`;

const MenuMobile: FC<Props> = (props) => {
  const { handleLanguageChange, isMenuClick, onMenuButtonClick } = props;

  return (
    <>
      {isMenuClick && <MenuOverlay onClick={onMenuButtonClick} />}
      <MenuMobileWrapper className={isMenuClick ? MenuAppear : undefined}>
        <Link
          to="/"
          className={css({
            textDecoration: "none",
            color: "black",
            "&:hover": {
              color: "gray",
            },
            paddingRight: "20px",
          })}
          onClick={onMenuButtonClick}
        >
          <p>{t("nav.menu.animeList.label")}</p>
        </Link>
        <Link
          to="/collection"
          className={css({
            textDecoration: "none",
            color: "black",
            "&:hover": {
              color: "gray",
            },
            paddingRight: "20px",
          })}
          onClick={onMenuButtonClick}
        >
          <p>{t("nav.menu.collection.label")}</p>
        </Link>
        <Button
          appearance="subtle-link"
          onClick={handleLanguageChange}
          className={css({
            color: "black !important",
            paddingLeft: "0 !important",
            "&:hover": {
              textDecoration: "none !important",
              color: "gray !important",
            },
          })}
        >
          {t("nav.menu.language.button.label")}
        </Button>
      </MenuMobileWrapper>
    </>
  );
};
export default MenuMobile;
