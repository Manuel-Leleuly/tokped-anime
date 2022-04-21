import React, { FC } from "react";
import { RouteComponentProps } from "react-router-dom";

interface Props extends RouteComponentProps<{ collectionId: string }> {}

const CollectionDetail: FC<Props> = (props) => {
  const {
    match: {
      params: { collectionId },
    },
  } = props;

  return (
    <>
      <p>this is the collection detail page</p>
      <p>{collectionId}</p>
    </>
  );
};
export default CollectionDetail;
