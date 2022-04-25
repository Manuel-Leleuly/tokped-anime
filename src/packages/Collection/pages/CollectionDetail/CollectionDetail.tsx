import React, { FC, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { CollectionData, CollectionList } from "../../../../models/Collection";
import { getCollectionListFromLocalStorage } from "../../../../utils/utils";
import { t } from "../../../../i18n/i18n";
import CollectionAnimeList from "./CollectionAnimeList";
import { AddCollectionModal } from "../CollectionList/Modal";
import Button from "@atlaskit/button";
import { css } from "@emotion/css";

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
      <div
        className={css`
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        `}
      >
        <div
          className={css`
            margin-right: 5px;
            font-size: 30px;
          `}
        >
          {selectedCollection.collectionName}
        </div>
        <div>
          [
          <Button
            className={css`
              text-decoration: none !important;
              :hover {
                text-decoration: none !important;
              }
            `}
            appearance="link"
            onClick={() => setSelectedModal(COLLECTION_DETAIL_MODALS.EDIT)}
          >
            <p
              className={css`
                color: black !important;
                margin: 0;
                font-weight: normal;
                :hover {
                  color: gray !important;
                }
              `}
            >
              {t("common.edit")}
            </p>
          </Button>
          ]
        </div>
      </div>
      <CollectionAnimeList
        animeList={selectedCollection.animeList}
        reFetchFunction={getCollectionData}
        collectionData={selectedCollection}
      />
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
