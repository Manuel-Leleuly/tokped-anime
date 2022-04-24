import styled from "@emotion/styled";
import React, { FC } from "react";
import { WINDOW_WIDTH } from "../../../../constants/constants";
import DOMPurify from "dompurify";

interface Props {
  description: string;
}

const DescriptionWrapper = styled.div`
  padding: 20px;
  margin: 20px;
  background: white;
  border: 2px solid black;
  border-radius: 10px;

  @media (max-width: ${WINDOW_WIDTH.md}) {
    padding: 10px;
    margin: 0;
  }
`;

const Description: FC<Props> = (props) => {
  const { description } = props;

  return <DescriptionWrapper dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }} />;
};
export default Description;
