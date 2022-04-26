import React, { FC, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { CollectionData } from "../../../../models/Collection";
import { getCollectionListFromLocalStorage } from "../../../../utils/utils";
import { t } from "../../../../i18n/i18n";
import CollectionAnimeList from "./CollectionAnimeList";
import { AddCollectionModal } from "../CollectionList/Modal";
import { css } from "@emotion/css";
import CollectionName from "./CollectionName";

interface Props extends RouteComponentProps<{ collectionId: string }> {}

enum COLLECTION_DETAIL_MODALS {
  "EDIT" = "EDIT",
}

const CollectionDetail: FC<Props> = (props) => {
  const {
    match: {
      params: { collectionId },
    },
  } = props;

  const [selectedCollection, setSelectedCollection] = useState<CollectionData | null>(null);
  const [selectedModal, setSelectedModal] = useState<COLLECTION_DETAIL_MODALS | null>(null);

  useEffect(() => {
    getCollectionData();
  }, []);

  const getCollectionData = () => {
    const collectionList = getCollectionListFromLocalStorage();
    const collectionData = collectionList.find((collection) => collection.id === +collectionId);
    if (collectionData) {
      setSelectedCollection(collectionData);
    }
  };

  if (!selectedCollection || (selectedCollection && !selectedCollection.animeList.length)) {
    return (
      <div
        className={css`
          width: 100%;
          text-align: center;
        `}
      >
        <p>{t("collectionDetail.notFound.label")}</p>
      </div>
    );
  }

  return (
    <>
      <CollectionName
        collectionName={selectedCollection.collectionName}
        onEditButtonClick={() => setSelectedModal(COLLECTION_DETAIL_MODALS.EDIT)}
      />
      <CollectionAnimeList
        animeList={selectedCollection.animeList}
        reFetchFunction={getCollectionData}
        collectionData={selectedCollection}
      />
      <br />
      {selectedModal === COLLECTION_DETAIL_MODALS.EDIT && (
        <AddCollectionModal
          collectionList={getCollectionListFromLocalStorage()}
          onSubmitSuccess={() => {
            setSelectedModal(null);
            getCollectionData();
          }}
          onCancel={() => setSelectedModal(null)}
          collectionId={selectedCollection.id}
          selectedCollectionName={selectedCollection.collectionName}
          isEdit
        />
      )}
    </>
  );
};
export default CollectionDetail;
