import styled from "@emotion/styled";
import React, { FC } from "react";
import { WINDOW_WIDTH } from "../../../../constants/constants";
import { currentLanguage, LANGUAGE_CODES } from "../../../../i18n/i18n";
import { CharacterNodes } from "../../../../models/Anime";

interface Props {
  allCasts: CharacterNodes;
}

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 100px;
  position: relative;
  overflow: hidden;
  margin-right: 5px;
`;

const AvatarOverlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 10;
  background: black;
  opacity: 0.3;
`;

const AvatarImage = styled.img`
  width: 40px;
  height: 40px;
  object-fill: fill;
  position: absolute;
  top: 0;
`;

const AvatarName = styled.p`
  font-size: 16px;
  color: black;
`;

const AvatarWrapper = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
`;

const CastWrapper = styled.div`
  padding: 20px;
  margin: 20px;
  border: 2px solid black;
  border-radius: 10px;

  display: grid;
  grid-template-columns: 1fr 1fr;

  @media (max-width: ${WINDOW_WIDTH.md}) {
    margin: 0;
    margin-top: 20px;
  }
`;

const renderCastName = (name: { full: string | null; native: string | null }): string => {
  if (currentLanguage === LANGUAGE_CODES.en) {
    return name.full || "";
  }
  if (currentLanguage === LANGUAGE_CODES.jp) {
    return name.native || "";
  }
  return "";
};

const Cast: FC<Props> = (props) => {
  const { allCasts } = props;

  return (
    <CastWrapper>
      {allCasts.map((cast) => (
        <span key={cast.id}>
          <AvatarWrapper>
            <Avatar>
              <AvatarOverlay />
              {cast.image && cast.image.medium && <AvatarImage src={cast.image.medium} alt={cast.id.toString()} />}
            </Avatar>
            <AvatarName>{renderCastName(cast.name)}</AvatarName>
          </AvatarWrapper>
        </span>
      ))}
    </CastWrapper>
  );
};
export default Cast;
