import Button from "@atlaskit/button";
import { css } from "@emotion/css";
import styled from "@emotion/styled";
import React, { FC } from "react";
import { Link, useHistory } from "react-router-dom";
import { MOBILE_WIDTH } from "../../constants/constants";
import { t } from "../../i18n/i18n";
import { ButtonLink } from "../Components";

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

  @media (max-width: ${MOBILE_WIDTH}) {
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
  height: 100vh;
`;

const MenuAppear = css`
  transform: translateX(210px);
  -webkit-transition: transform 1s ease-in-out;
  transition: transform 0.5s ease-in-out;
`;

const MenuMobile: FC<Props> = (props) => {
  const history = useHistory();
  const { handleLanguageChange, isMenuClick, onMenuButtonClick } = props;

  return (
    <>
      {isMenuClick && <MenuOverlay onClick={onMenuButtonClick} />}
      <MenuMobileWrapper className={isMenuClick ? MenuAppear : undefined}>
        <ButtonLink
          onClick={() => {
            onMenuButtonClick();
            history.push(`/`);
          }}
          label={t("nav.menu.animeList.label")}
        />
        <ButtonLink
          onClick={() => {
            onMenuButtonClick();
            history.push(`/collection`);
          }}
          label={t("nav.menu.collection.label")}
        />
        <ButtonLink onClick={handleLanguageChange} label={t("nav.menu.language.button.label")} />
      </MenuMobileWrapper>
    </>
  );
};
export default MenuMobile;
