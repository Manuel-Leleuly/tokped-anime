import { css } from "@emotion/css";
import styled from "@emotion/styled";
import React, { FC } from "react";

interface Props {
  mediumImageUrl: string | null;
  title: string;
  releaseYear?: number;
}

const MovieCardWrapper = styled.div`
  width: 150px;
  height: 250px;
  position: relative;
  margin: 5px;
`;

const Backdrop = styled.img`
  width: 150px;
  height: 250px;
  object-fit: fill;
  position: absolute;
  display: block;
  top: 0;
`;

const MovieInfo = styled.div`
  position: absolute;
  bottom: 20px;
  z-index: 10;
`;

const AnimeCard: FC<Props> = (props) => {
  const { mediumImageUrl, title, releaseYear } = props;

  return (
    <MovieCardWrapper>
      {mediumImageUrl && <Backdrop src={mediumImageUrl} alt={title} />}
      <MovieInfo>
        <p
          className={css({
            marginBottom: "1rem",
          })}
        >
          {title}
        </p>
        <p>{releaseYear}</p>
      </MovieInfo>
    </MovieCardWrapper>
  );
};
export default AnimeCard;
