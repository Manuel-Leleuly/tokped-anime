import React, { FC } from "react";
import Button, { Appearance } from "@atlaskit/button";
import { css } from "@emotion/css";

interface Props {
  label: string;
  onClick: () => void;
  isDisabled?: boolean;
  buttonClassName?: string;
  labelClassName?: string;
}

const ButtonFull: FC<Props> = (props) => {
  const { label, onClick, isDisabled, labelClassName, buttonClassName } = props;

  return (
    <Button
      appearance="primary"
      onClick={onClick}
      isDisabled={isDisabled}
      className={`${css`
        background: black !important;
        :hover {
          background: gray !important;
        }
      `} ${buttonClassName}`}
    >
      <p
        className={`${css`
          margin: 0;
        `} ${labelClassName}`}
      >
        {label}
      </p>
    </Button>
  );
};
export default ButtonFull;
