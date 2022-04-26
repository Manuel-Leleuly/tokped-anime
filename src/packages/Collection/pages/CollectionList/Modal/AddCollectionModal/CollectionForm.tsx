import React, { ChangeEvent, FC } from "react";
import { ButtonLink, FieldText } from "../../../../../../components/Components";
import { t } from "../../../../../../i18n/i18n";
import { css } from "@emotion/css";

interface Props {
  collectionName: string;
  onCollectionNameChange: (event: ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
  showSeeCollectionListButton?: boolean;
  onSeeCollectionListButtonClick?: () => void;
}

const CollectionForm: FC<Props> = (props) => {
  const {
    collectionName,
    onCollectionNameChange,
    errorMessage,
    showSeeCollectionListButton,
    onSeeCollectionListButtonClick,
  } = props;

  return (
    <>
      <FieldText
        label={t("collectionList.modal.addEditCollection.form.label")}
        name="collectionName"
        onChange={onCollectionNameChange}
        value={collectionName}
        helperMessage={errorMessage}
      />
      {!!showSeeCollectionListButton && onSeeCollectionListButtonClick && (
        <div
          className={css`
            margin-top: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
          `}
        >
          <ButtonLink
            onClick={onSeeCollectionListButtonClick}
            label={t("collectionList.modal.addEditCollection.seeCollectionList.label")}
          />
        </div>
      )}
    </>
  );
};
export default CollectionForm;
