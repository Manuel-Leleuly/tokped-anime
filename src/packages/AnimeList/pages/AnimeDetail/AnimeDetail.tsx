import React, { FC } from "react";
import { RouteComponentProps } from "react-router-dom";

interface Props extends RouteComponentProps<{ animeId: string }> {}

const AnimeDetail: FC<Props> = (props) => {
  const {
    match: {
      params: { animeId },
    },
  } = props;

  return (
    <>
      <p>this is the anime detail page</p>
      <p>{animeId}</p>
    </>
  );
};
export default AnimeDetail;
