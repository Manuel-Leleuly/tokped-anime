import Button from "@atlaskit/button";
import { css } from "@emotion/css";
import React, { FC } from "react";
import { useHistory } from "react-router-dom";
import styled from "@emotion/styled";
import { MOBILE_WIDTH } from "../../constants/constants";
import { t } from "../../i18n/i18n";
import { ButtonLink } from "../Components";

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
  display: block;

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
  const history = useHistory();
  const { handleLanguageChange, onMenuButtonClick } = props;
  return (
    <>
      <Div>
        <DesktopMenu>
          <ButtonLink onClick={() => history.push(`/`)} label={t("nav.menu.animeList.label")} />
          <ButtonLink onClick={() => history.push(`/collection`)} label={t("nav.menu.collection.label")} />
        </DesktopMenu>
      </Div>
      <ButtonWrapper>
        <ButtonLink onClick={handleLanguageChange} label={t("nav.menu.language.button.label")} />
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
