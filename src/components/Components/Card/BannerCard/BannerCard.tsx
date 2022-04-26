import styled from "@emotion/styled";
import React, { FC } from "react";
import { WINDOW_WIDTH } from "../../../../constants/constants";
import { ButtonFull } from "../../index";
import { css } from "@emotion/css";

interface Props {
  bannerImage: string | null;
  title: string;
  addToCollection?: {
    label: string;
    onCLick: () => void;
    isDisabled?: boolean;
  };
}

const BannerCardDiv = styled.div`
  width: 100%;
  height: 300px;
  position: relative;
  overflow: hidden;

  @media (max-width: ${WINDOW_WIDTH.md}) {
    height: 70px;
  }
`;

const BannerCardOverlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: black;
  opacity: 0.5;
  height: 100vh;
`;

const BannerCardTitleWrapper = styled.div`
  position: absolute;
  margin: 15px;
  bottom: 0;

  @media (max-width: ${WINDOW_WIDTH.md}) {
    margin: 5px;
  }
`;

const BannerCardTitle = styled.p`
  color: white;
  font-size: 25px;
  text-wrap: wrap;

  @media (max-width: ${WINDOW_WIDTH.md}) {
    font-size: 10px;
  }
`;

const BannerCardImage = styled.img`
  object-fit: fill;
  position: absolute;
  display: block;
  top: 0;
`;

const BannerCard: FC<Props> = (props) => {
  const { bannerImage, title, addToCollection } = props;

  return (
    <BannerCardDiv>
      {bannerImage && <BannerCardImage src={bannerImage} alt={title} />}
      <BannerCardOverlay />
      <BannerCardTitleWrapper>
        <BannerCardTitle>{title}</BannerCardTitle>
        {addToCollection && (
          <div
            className={css`
              margin-top: 5px;
            `}
          >
            <ButtonFull
              label={addToCollection.label}
              onClick={addToCollection.onCLick}
              isDisabled={addToCollection.isDisabled}
            />
          </div>
        )}
      </BannerCardTitleWrapper>
    </BannerCardDiv>
  );
};
export default BannerCard;
