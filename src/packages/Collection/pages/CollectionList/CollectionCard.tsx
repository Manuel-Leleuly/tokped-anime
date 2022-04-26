import React, { FC } from "react";
import styled from "@emotion/styled";
import { CollectionData } from "../../../../models/Collection";
import { Link } from "react-router-dom";
import { css } from "@emotion/css";
import { t } from "../../../../i18n/i18n";
import { ButtonFull } from "../../../../components/Components";

const CollectionDiv = styled.div`
  width: 300px;
  height: 180px;
  position: relative;
  overflow: hidden;
  margin: auto;
  margin-top: 10px;
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
  text-align: center;
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
  width: 80%;
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
          bottom: 10px;
        `}
      >
        <ButtonFull
          label={t("common.edit")}
          onClick={() => onEditButtonClick(collectionData)}
          buttonClassName={css`
            margin-right: 5px;
            :hover {
              background: #282c34 !important;
            }
          `}
        />
        <ButtonFull
          label={t("common.remove")}
          onClick={() => onRemoveButtonClick(collectionData)}
          buttonClassName={css`
            margin-right: 5px;
            :hover {
              background: #282c34 !important;
            }
          `}
        />
      </div>
    </CollectionDiv>
  );
};
export default CollectionCard;
