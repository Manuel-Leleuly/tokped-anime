import { css } from "@emotion/css";
import styled from "@emotion/styled";
import React, { ReactNode } from "react";
import { WINDOW_WIDTH } from "../../../constants/constants";

const PageDiv = styled.div`
  margin-top: 7rem;
  padding-left: 4rem;
  padding-right: 4rem;

  @media (max-width: ${WINDOW_WIDTH.md}) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;

const Page = ({ children }: { children: ReactNode }) => {
  return <PageDiv>{children}</PageDiv>;
};
export default Page;
