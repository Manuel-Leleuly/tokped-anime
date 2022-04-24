import Button from "@atlaskit/button";
import { css } from "@emotion/css";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { MOBILE_WIDTH } from "../../constants/constants";
import { t } from "../../i18n/i18n";

interface Props {
  handleLanguageChange: () => void;
  onMenuButtonClick: () => void;
}

const Div = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${MOBILE_WIDTH}) {
    display: none;
  }
`;

const ButtonWrapper = styled.span`
  color: black !important;
  display: block;

  :hover {
    text-decoration: none !important;
    color: gray !important;
  }

  @media (max-width: ${MOBILE_WIDTH}) {
    display: none;
  }
`;

const DesktopMenu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 250px;
`;

const MenuWrapper = styled.span`
  display: none;

  @media (max-width: ${MOBILE_WIDTH}) {
    display: block;
  }
`;

const MenuDesktop: FC<Props> = (props) => {
  const { handleLanguageChange, onMenuButtonClick } = props;
  return (
    <>
      <Div>
        <DesktopMenu>
          <Link
            to="/"
            className={css({
              textDecoration: "none",
              color: "black",
              "&:hover": {
                color: "gray",
              },
            })}
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
            })}
          >
            <p>{t("nav.menu.collection.label")}</p>
          </Link>
        </DesktopMenu>
      </Div>
      <ButtonWrapper>
        <Button
          appearance="subtle-link"
          onClick={handleLanguageChange}
          className={css({
            color: "black !important",
            "&:hover": {
              textDecoration: "none !important",
              color: "gray !important",
            },
          })}
        >
          {t("nav.menu.language.button.label")}
        </Button>
      </ButtonWrapper>
      <MenuWrapper>
        <Button
          appearance="link"
          onClick={onMenuButtonClick}
          className={css({
            color: "black !important",
            "&:hover": {
              textDecoration: "none !important",
            },
          })}
        >
          {t("nav.menu.button.label")}
        </Button>
      </MenuWrapper>
    </>
  );
};
export default MenuDesktop;
