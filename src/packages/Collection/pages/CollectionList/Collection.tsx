import React, { FC, useEffect, useState } from "react";
import { CollectionList } from "../../../../models/Collection";
import { RequestType } from "../../../../models/Response";
import { getCollectionListFromLocalStorage } from "../../../../utils/utils";
import styled from "@emotion/styled";
import { WINDOW_WIDTH } from "../../../../constants/constants";
import { Link } from "react-router-dom";
import { css } from "@emotion/css";
import Button from "@atlaskit/button";
import { t } from "../../../../i18n/i18n";

const CollectionWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

const CollectionDiv = styled.div`
  width: 300px;
  height: 200px;
  position: relative;
  overflow: hidden;
`;

const CollectionImage = styled.img`
  width: 20px;
  height: 30px;
`;

const CollectionOverlay = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  z-index: 10;
  top: 0;
  background: black;
  opacity: 0.5;
`;

const CollectionInfo = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  position: absolute;
  z-index: 20;
  bottom: 0;

  @media (max-width: ${WINDOW_WIDTH.md}) {
    padding: 10px;
  }
`;

const CollectionTitle = styled.p`
  font-size: 20px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  @media (max-width: ${WINDOW_WIDTH.md}) {
    font-size: 10px;
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

const Collection: FC = () => {
  const [collectionList, setCollectionList] = useState<RequestType<CollectionList>>({
    isLoading: false,
    data: [],
    error: null,
  });

  useEffect(() => {
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
  }, []);

  if (!collectionList.data.length) {
    return (
      <CollectionNotFound>
        <p className={css({ marginRight: "5px" })}>{t("collectionList.notFound.message")}</p>
        <Button appearance="link" onClick={() => console.log("yeay")}>
          {t("collectionList.notFound.button.label")}
        </Button>
      </CollectionNotFound>
    );
  }

  return (
    <CollectionWrapper>
      {collectionList.data.map((collection) => (
        <CollectionDiv key={collection.id}>
          {collection.animeList.map((anime) => {
            if (anime.coverImage.medium) {
              return <CollectionImage key={anime.id} src={anime.coverImage.medium} alt={anime.title.english || ""} />;
            }
          })}
          <CollectionOverlay />
          <CollectionInfo>
            <CollectionTitle>{collection.collectionName}</CollectionTitle>
          </CollectionInfo>
        </CollectionDiv>
      ))}
    </CollectionWrapper>
  );
};
export default Collection;
