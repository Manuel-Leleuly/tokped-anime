import React, { FC, useEffect, useState } from "react";
import { CollectionData, CollectionList } from "../../../../models/Collection";
import { RequestType } from "../../../../models/Response";
import { getCollectionListFromLocalStorage } from "../../../../utils/utils";
import styled from "@emotion/styled";
import { WINDOW_WIDTH } from "../../../../constants/constants";
import { css } from "@emotion/css";
import Button from "@atlaskit/button";
import { t } from "../../../../i18n/i18n";
import { AddCollectionModal, RemoveCollectionModal } from "./Modal";
import CollectionCard from "./Modal/AddCollectionModal/CollectionCard";

const CollectionWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  @media (max-width: ${WINDOW_WIDTH.lg}) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: ${WINDOW_WIDTH.md}) {
    grid-template-columns: 1fr;
  }
`;

const CollectionNotFound = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  @media (max-width: ${WINDOW_WIDTH.md}) {
    display: block;
  }
`;

enum COLLECTION_MODALS {
  "ADD" = "ADD",
  "EDIT" = "EDIT",
  "REMOVE" = "REMOVE",
}

type COLLECTION_MODALS_TYPE = keyof typeof COLLECTION_MODALS;

const Collection: FC = () => {
  const [collectionList, setCollectionList] = useState<RequestType<CollectionList>>({
    isLoading: false,
    data: [],
    error: null,
  });

  const [selectedCollection, setSelectedCollection] = useState<CollectionData | null>(null);

  const [selectedModal, setSelectedModal] = useState<COLLECTION_MODALS_TYPE | null>(null);

  useEffect(() => {
    getCollectionList();
  }, []);

  const getCollectionList = () => {
    setCollectionList((prevState) => ({ ...prevState, isLoading: true }));
    try {
      setCollectionList((prevState) => ({
        ...prevState,
        data: getCollectionListFromLocalStorage(),
        error: null,
        isLoading: false,
      }));
    } catch (error) {
      setCollectionList((prevState) => ({ ...prevState, error: error as Error, isLoading: false }));
    }
  };

  if (!collectionList.data.length) {
    return (
      <>
        <CollectionNotFound>
          <p className={css({ marginRight: "5px" })}>{t("collectionList.notFound.message")}</p>
          <Button appearance="link" onClick={() => setSelectedModal(COLLECTION_MODALS.ADD)}>
            {t("collectionList.notFound.button.label")}
          </Button>
        </CollectionNotFound>
        {selectedModal === COLLECTION_MODALS.ADD && (
          <AddCollectionModal
            collectionList={collectionList.data}
            onSubmitSuccess={() => {
              setSelectedModal(null);
              getCollectionList();
            }}
            onCancel={() => setSelectedModal(null)}
          />
        )}
      </>
    );
  }

  return (
    <>
      <div
        className={css`
          width: 100%;
          text-align: center;
          margin-bottom: 20px;
        `}
      >
        <Button appearance="link" onClick={() => setSelectedModal(COLLECTION_MODALS.ADD)}>
          {t("collectionList.addNewCollection.button.label")}
        </Button>
      </div>
      <CollectionWrapper>
        {collectionList.data.map((collection) => (
          <CollectionCard
            key={collection.id}
            collectionData={collection}
            onEditButtonClick={(selectedCollectionData) => {
              setSelectedCollection(selectedCollectionData);
              setSelectedModal(COLLECTION_MODALS.EDIT);
            }}
            onRemoveButtonClick={(selectedCollectionData) => {
              setSelectedCollection(selectedCollectionData);
              setSelectedModal(COLLECTION_MODALS.REMOVE);
            }}
          />
        ))}
      </CollectionWrapper>
      {selectedModal === COLLECTION_MODALS.ADD && (
        <AddCollectionModal
          collectionList={collectionList.data}
          onSubmitSuccess={() => {
            setSelectedModal(null);
            getCollectionList();
          }}
          onCancel={() => setSelectedModal(null)}
        />
      )}
      {selectedModal === COLLECTION_MODALS.EDIT && selectedCollection && (
        <AddCollectionModal
          collectionList={collectionList.data}
          onSubmitSuccess={() => {
            setSelectedModal(null);
            getCollectionList();
          }}
          onCancel={() => setSelectedModal(null)}
          isEdit
          selectedCollectionName={selectedCollection.collectionName}
          collectionId={selectedCollection.id}
        />
      )}
      {selectedModal === COLLECTION_MODALS.REMOVE && selectedCollection && (
        <RemoveCollectionModal
          collectionData={selectedCollection}
          onSubmitSuccess={() => {
            getCollectionList();
            setSelectedModal(null);
          }}
          onCancel={() => setSelectedModal(null)}
          collectionList={collectionList.data}
        />
      )}
    </>
  );
};
export default Collection;
