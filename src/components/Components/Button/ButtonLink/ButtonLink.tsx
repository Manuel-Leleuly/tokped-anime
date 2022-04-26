import React, { FC } from "react";
import { css } from "@emotion/css";
import Button from "@atlaskit/button";

interface Props {
  onClick: () => void;
  label: string;
  lightText?: boolean;
  isDisabled?: boolean;
}

const ButtonLink: FC<Props> = (props) => {
  const { onClick, label, lightText, isDisabled } = props;

  return (
    <Button
      appearance="link"
      onClick={onClick}
      className={css`
        text-decoration: none !important;
        :hover {
          text-decoration: none !important;
        }
      `}
      isDisabled={isDisabled}
    >
      <p
        className={css`
          margin: 0;
          color: black !important;
          :hover {
            color: gray !important;
          }
        `}
      >
        <span
          className={
            lightText
              ? css`
                  font-weight: normal;
                `
              : undefined
          }
        >
          {label}
        </span>
      </p>
    </Button>
  );
};
export default ButtonLink;
