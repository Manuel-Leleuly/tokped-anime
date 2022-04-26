import React, { ReactNode, useEffect } from "react";
import styled from "@emotion/styled";
import { WINDOW_WIDTH } from "../../../constants/constants";
import { css } from "@emotion/css";
import ButtonLink from "../Button/ButtonLink/ButtonLink";
import ButtonFull from "../Button/ButtonFull/ButtonFull";

interface Props {
  children: ReactNode;
  onSubmit?: () => void;
  onCancel: () => void;
  submitText?: string;
  cancelText: string;
  isDisabled?: boolean;
}

const ModalOverlay = styled.div`
  position: fixed;
  z-index: 1000;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: black;
  opacity: 0.5;
`;

const ModalWrapper = styled.div`
  position: fixed;
  z-index: 1001;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 300px;
  max-width: 400px;
  padding: 20px;
  background: white;

  @media (max-width: ${WINDOW_WIDTH.md}) {
    padding: 10px;
  }
`;

const ButtonWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: end;
  align-items: center;

  @media (max-width: ${WINDOW_WIDTH.md}) {
    margin-top: 10px;
  }
`;

const Modal = (props: Props) => {
  const { children, onSubmit, onCancel, submitText, cancelText, isDisabled } = props;

  useEffect(() => {
    const bodyElement = document.getElementById("Body");
    if (bodyElement) {
      bodyElement.style.overflow = "hidden";
    }

    return () => {
      if (bodyElement) {
        bodyElement.style.overflow = "";
      }
    };
  }, []);

  return (
    <div>
      <ModalOverlay />
      <ModalWrapper>
        {children}
        <ButtonWrapper>
          <ButtonLink onClick={onCancel} label={cancelText} />
          {onSubmit && submitText && (
            <ButtonFull
              label={submitText}
              onClick={onSubmit}
              isDisabled={isDisabled}
              labelClassName={css`
                color: white !important;
              `}
            />
          )}
        </ButtonWrapper>
      </ModalWrapper>
    </div>
  );
};
export default Modal;
