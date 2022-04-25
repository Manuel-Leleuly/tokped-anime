import React, { FC, ReactNode } from "react";
import styled from "@emotion/styled";
import { WINDOW_WIDTH } from "../../../constants/constants";
import Button from "@atlaskit/button";
import { css } from "@emotion/css";

interface Props {
  children: ReactNode;
  onSubmit?: () => void;
  onCancel: () => void;
  submitText?: string;
  cancelText: string;
  isDisabled?: boolean;
}

const ModalOverlay = styled.div`
  position: absolute;
  z-index: 1000;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: black;
  opacity: 0.5;
`;

const ModalWrapper = styled.div`
  position: absolute;
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

const CancelText = styled.p`
  color: black !important;
  text-decoration: none !important;
  margin: 0;

  :hover {
    color: gray !important;
    text-decoration: none !important;
  }
`;

const SubmitText = styled.p`
  color: white !important;
  margin: 0;

  :hover {
    background: gray !important;
  }
`;

const Modal = (props: Props) => {
  const { children, onSubmit, onCancel, submitText, cancelText, isDisabled } = props;

  return (
    <>
      <ModalOverlay />
      <ModalWrapper>
        {children}
        <ButtonWrapper>
          <Button
            appearance="link"
            onClick={onCancel}
            className={css`
              text-decoration: none !important;
            `}
          >
            <CancelText>{cancelText}</CancelText>
          </Button>
          {onSubmit && submitText && (
            <Button
              appearance="primary"
              onClick={onSubmit}
              className={css`
                background: black !important;
                :hover {
                  background: gray !important;
                }
              `}
              isDisabled={isDisabled}
            >
              <SubmitText>{submitText}</SubmitText>
            </Button>
          )}
        </ButtonWrapper>
      </ModalWrapper>
    </>
  );
};
export default Modal;
