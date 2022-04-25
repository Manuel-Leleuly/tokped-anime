import React, { ChangeEvent, FC } from "react";
import { FieldText } from "../../../../../../components/Components";
import { t } from "../../../../../../i18n/i18n";

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
        label={t("collectionList.modal.addEditCollection.form.label")}
        name="collectionName"
        onChange={onCollectionNameChange}
        value={collectionName}
        helperMessage={errorMessage}
      />
    </>
  );
};
export default CollectionForm;
