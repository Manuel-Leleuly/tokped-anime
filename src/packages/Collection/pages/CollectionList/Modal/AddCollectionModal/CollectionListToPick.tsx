import React, { Dispatch, FC, SetStateAction } from "react";
import { CollectionData, CollectionList } from "../../../../../../models/Collection";
import { css } from "@emotion/css";
import { Radio } from "@atlaskit/radio";
import { ButtonLink } from "../../../../../../components/Components";
import { t } from "../../../../../../i18n/i18n";

interface Props {
  collectionList: CollectionList;
  selectedCollection: CollectionData | null;
  setSelectedCollection: Dispatch<SetStateAction<CollectionData | null>>;
  isRadioDisabled?: (selectedCollectionData: CollectionData) => boolean;
  onCreateANewCollectionClick: () => void;
}

const CollectionListToPick: FC<Props> = (props) => {
  const { collectionList, selectedCollection, setSelectedCollection, isRadioDisabled, onCreateANewCollectionClick } =
    props;

  const onRadioSelected = (collection: CollectionData) => {
    setSelectedCollection(collection);
  };

  return (
    <>
      <div
        className={css`
          text-align: center;
          margin-bottom: 20px;
        `}
      >
        <p
          className={css`
            margin: 0;
          `}
        >
          {t("collectionList.modal.addEditCollection.collectionList.title")}
        </p>
      </div>
      {collectionList.map((collection) => (
        <div
          key={collection.id}
          className={css`
            margin-top: 4px;
            margin-bottom: 4px;
          `}
        >
          <Radio
            label={collection.collectionName}
            value={collection.id.toString()}
            isChecked={selectedCollection ? selectedCollection.collectionName === collection.collectionName : undefined}
            onChange={() => onRadioSelected(collection)}
            isDisabled={isRadioDisabled ? isRadioDisabled(collection) : undefined}
          />
        </div>
      ))}
      <div
        className={css`
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 10px;
        `}
      >
        <ButtonLink
          onClick={onCreateANewCollectionClick}
          label={t("collectionList.modal.addEditCollection.createNewCollection.label")}
        />
      </div>
    </>
  );
};
export default CollectionListToPick;
