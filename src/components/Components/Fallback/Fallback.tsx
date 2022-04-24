import { css } from "@emotion/css";
import styled from "@emotion/styled";
import React from "react";
import { WINDOW_WIDTH } from "../../../constants/constants";
import { t } from "../../../i18n/i18n";
import Center from "../Center/Center";

const FallbackWrapper = styled.div`
  position: fixed;
  z-index: 500;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.85);
  width: 100%;
  height: 100vh;
`;

const FallbackText = styled.span`
  color: white;
  font-size: 40px;

  @media (max-width: ${WINDOW_WIDTH.md}) {
    font-size: 20px;
  }
`;

const Fallback = () => {
  return (
    <FallbackWrapper>
      <Center>
        <FallbackText>{t("loading.label")}</FallbackText>
      </Center>
    </FallbackWrapper>
  );
};
export default Fallback;
