import { css } from "@emotion/css";
import styled from "@emotion/styled";
import React, { ReactNode } from "react";

const CenterDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Center = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <CenterDiv>
      <span className={className}>{children}</span>
    </CenterDiv>
  );
};
export default Center;
