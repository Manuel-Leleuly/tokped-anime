import styled from "@emotion/styled";
import React, { FC } from "react";
import { WINDOW_WIDTH } from "../../../../constants/constants";

interface Props {
  bannerImage: string | null;
  title: string;
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
  const { bannerImage, title } = props;

  return (
    <BannerCardDiv>
      {bannerImage && <BannerCardImage src={bannerImage} alt={title} />}
      <BannerCardOverlay />
      <BannerCardTitleWrapper>
        <BannerCardTitle>{title}</BannerCardTitle>
      </BannerCardTitleWrapper>
    </BannerCardDiv>
  );
};
export default BannerCard;
