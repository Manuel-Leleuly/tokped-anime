import React, { FC } from "react";
import styled from "@emotion/styled";
import { CollectionData } from "../../../../../../models/Collection";
import { Link } from "react-router-dom";
import { css } from "@emotion/css";
import Button from "@atlaskit/button";

const CollectionDiv = styled.div`
  width: 300px;
  height: 180px;
  position: relative;
  overflow: hidden;
  margin: auto;
`;

const CollectionImage = styled.img`
  width: 50px;
  height: 60px;
`;

const CollectionOverlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 10;
  top: 0;
  background: black;
  opacity: 0.5;
`;

const CollectionInfo = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 20;
  top: 0;
`;

const CollectionTitle = styled.p`
  font-size: 20px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: white;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

interface Props {
  collectionData: CollectionData;
  onEditButtonClick: (selectedCollectionData: CollectionData) => void;
  onRemoveButtonClick: (selectedCollectionData: CollectionData) => void;
}

const CollectionCard: FC<Props> = (props) => {
  const { collectionData, onEditButtonClick, onRemoveButtonClick } = props;

  return (
    <>
      <CollectionDiv>
        <Link to={`/collection/${collectionData.id}`}>
          {collectionData.animeList.map((anime) => {
            if (anime.coverImage.medium) {
              return <CollectionImage key={anime.id} src={anime.coverImage.medium} alt={anime.title.english || ""} />;
            }
          })}
          <CollectionOverlay />
          <CollectionInfo>
            <CollectionTitle>{collectionData.collectionName}</CollectionTitle>
          </CollectionInfo>
        </Link>
        <div
          className={css`
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            z-index: 30;
            width: 100%;
          `}
        >
          <Button
            appearance="primary"
            onClick={() => onEditButtonClick(collectionData)}
            className={css`
              margin-right: 5px;
            `}
          >
            Edit
          </Button>
          <Button appearance="danger" onClick={() => onRemoveButtonClick(collectionData)}>
            Remove
          </Button>
        </div>
      </CollectionDiv>
    </>
  );
};
export default CollectionCard;
