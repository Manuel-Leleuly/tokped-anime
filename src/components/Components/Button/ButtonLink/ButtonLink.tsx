import React, { FC } from "react";
import { css } from "@emotion/css";
import Button from "@atlaskit/button";

interface Props {
  onClick: () => void;
  label: string;
  lightText?: boolean;
  isDisabled?: boolean;
  buttonClassName?: string;
  labelClassName?: string;
}

const ButtonLink: FC<Props> = (props) => {
  const { onClick, label, lightText, isDisabled, buttonClassName, labelClassName } = props;

  return (
    <Button
      appearance="link"
      onClick={onClick}
      className={`${css`
        text-decoration: none !important;
        :hover {
          text-decoration: none !important;
        }
      `} ${buttonClassName}`}
      isDisabled={isDisabled}
    >
      <p
        className={`${
          !isDisabled
            ? css`
                margin: 0;
                color: black;
                :hover {
                  color: gray;
                }
              `
            : css`
                margin: 0;
              `
        } ${labelClassName}`}
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
