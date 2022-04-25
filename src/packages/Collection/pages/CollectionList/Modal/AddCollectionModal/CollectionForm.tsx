import React, { ChangeEvent, FC } from "react";
import { FieldText } from "../../../../../../components/Components";
import { css } from "@emotion/css";
import Button from "@atlaskit/button";
import { CollectionList } from "../../../../../../models/Collection";

interface Props {
  collectionName: string;
  onCollectionNameChange: (event: ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
}

const CollectionForm: FC<Props> = (props) => {
  const { collectionName, onCollectionNameChange, errorMessage } = props;

  return (
    <>
      <FieldText
        label={"Collection Name"}
        name="collectionName"
        onChange={onCollectionNameChange}
        value={collectionName}
        helperMessage={errorMessage}
      />
    </>
  );
};
export default CollectionForm;
