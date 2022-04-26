import React, { FC, useState } from "react";
import { CollectionData, CollectionMedia } from "../../../../models/Collection";
import styled from "@emotion/styled";
import { WINDOW_WIDTH } from "../../../../constants/constants";
import { AnimeCard, ButtonLink } from "../../../../components/Components";
import { t } from "../../../../i18n/i18n";
import { Link } from "react-router-dom";
import { getTitle } from "../../../../utils/utils";
import { css } from "@emotion/css";
import { RemoveAnimeFromCollectionModal } from "./Modals";

interface Props {
  collectionData: CollectionData;
  animeList: CollectionMedia[];
  reFetchFunction: () => void;
}

const AnimeListPage = styled.div`
  padding-left: 2rem;
  padding-right: 2rem;
  position: relative;

  @media (max-width: ${WINDOW_WIDTH.md}) {
    padding: 0;
  }
`;

const AnimeListWrapper = styled.div`
  width: auto;
  margin-top: 50px;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;

  @media (max-width: ${WINDOW_WIDTH.lg}) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  @media (max-width: ${WINDOW_WIDTH.md}) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (max-width: ${WINDOW_WIDTH.sm}) {
    grid-template-columns: 1fr 1fr;
  }
`;

enum COLLECTION_ANIME_LIST_MODALS {
  "REMOVE" = "REMOVE",
}

const CollectionAnimeList: FC<Props> = (props) => {
  const { animeList, reFetchFunction, collectionData } = props;

  const [selectedModal, setSelectedModal] = useState<COLLECTION_ANIME_LIST_MODALS | null>(null);
  const [selectedCollectionMedia, setSelectedCollectionMedia] = useState<CollectionMedia | null>(null);

  return (
    <>
      <AnimeListPage>
        <AnimeListWrapper>
          {animeList.map((anime) => (
            <div
              className={css`
                margin: auto;
              `}
              key={anime.id}
            >
              <Link to={`/${anime.id}`}>
                <AnimeCard
                  mediumImageUrl={anime.coverImage.medium}
                  title={getTitle(anime.title)}
                  releaseYear={anime.seasonYear || undefined}
                />
              </Link>
              <div
                className={css`
                  width: 100%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                `}
              >
                <ButtonLink
                  onClick={() => {
                    setSelectedCollectionMedia(anime);
                    setSelectedModal(COLLECTION_ANIME_LIST_MODALS.REMOVE);
                  }}
                  label={t("common.remove")}
                />
              </div>
            </div>
          ))}
        </AnimeListWrapper>
      </AnimeListPage>
      {selectedModal === COLLECTION_ANIME_LIST_MODALS.REMOVE && selectedCollectionMedia && (
        <RemoveAnimeFromCollectionModal
          collectionData={collectionData}
          collectionMedia={selectedCollectionMedia}
          onSubmitSuccess={() => {
            reFetchFunction();
            setSelectedModal(null);
          }}
          onCancel={() => setSelectedModal(null)}
        />
      )}
    </>
  );
};
export default CollectionAnimeList;
