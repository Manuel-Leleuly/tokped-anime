import React, { ReactNode } from "react";
import { css } from "@emotion/css";
import { WINDOW_WIDTH } from "../../../constants/constants";

const AnimeListWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className={css`
        width: auto;
        margin-top: 50px;

        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;

        @media (max-width: ${WINDOW_WIDTH.xl}) {
          grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        }

        @media (max-width: 1000px) {
          grid-template-columns: 1fr 1fr 1fr 1fr;
        }

        @media (max-width: 850px) {
          grid-template-columns: 1fr 1fr 1fr;
        }

        @media (max-width: 550px) {
          grid-template-columns: 1fr 1fr;
        }
      `}
    >
      {children}
    </div>
  );
};
export default AnimeListWrapper;
