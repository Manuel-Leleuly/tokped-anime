import React, { ChangeEvent, Dispatch, FC, SetStateAction, useContext, useEffect, useState } from "react";
import { Checkbox } from "@atlaskit/checkbox";
import { CollectionMedia } from "../../../../../../models/Collection";
import { RequestType } from "../../../../../../models/Response";
import { MediaPageResponse, MediaResponse } from "../../../../../../models/Anime";
import { fetchAnimeList } from "../../../../../../api/Anime";
import { ANIME_PER_PAGE } from "../../../../../AnimeList/pages/AnimeList/AnimeList";
import { AbortControllerContext } from "../../../../../../context/AbortControllerContext";
import styled from "@emotion/styled";
import { t } from "../../../../../../i18n/i18n";
import { convertMediaResponseToCollectionMedia, getTitle } from "../../../../../../utils/utils";
import { Pagination } from "../../../../../../components/Components";
import { css } from "@emotion/css";

interface Props {
  selectedMedia: CollectionMedia[];
  setSelectedMedia: Dispatch<SetStateAction<CollectionMedia[]>>;
}

const AnimeOptionWrapper = styled.div`
  width: 100%;
  margin: 5px 0;
`;

const AnimeListToPick: FC<Props> = (props) => {
  const { signal } = useContext(AbortControllerContext);
  const { selectedMedia, setSelectedMedia } = props;

  const [animeList, setAnimeList] = useState<RequestType<MediaPageResponse | null>>({
    isLoading: false,
    data: null,
    error: null,
  });
  const [selectedPage, setSelectedPage] = useState<number>(1);

  const isMediaSelected = (mediaId: number): boolean => {
    return !!selectedMedia.find((media) => media.id === mediaId);
  };

  useEffect(() => {
    (async () => {
      await getAnimeList(selectedPage);
    })();
  }, [selectedPage]);

  const getAnimeList = async (pageNumber: number) => {
    if (animeList.isLoading) return;
    setAnimeList((prevState) => ({ ...prevState, isLoading: true, data: null }));
    fetchAnimeList(pageNumber, ANIME_PER_PAGE, signal)
      .then((result) => {
        if (result.response && result.response.data) {
          const { data } = result.response;
          setAnimeList((prevState) => ({ ...prevState, data: data.data, error: null, isLoading: false }));
        } else {
          throw result.error;
        }
      })
      .catch((error) => {
        setAnimeList((prevState) => ({ ...prevState, error, isLoading: false }));
      });
  };

  const onPageChange = (pageNumber: number) => {
    setSelectedPage(pageNumber);
  };

  const onMediaSelected = (event: ChangeEvent<HTMLInputElement>, media: MediaResponse) => {
    const { checked } = event.target;
    let newSelectedMedia = [...selectedMedia];
    if (checked) {
      newSelectedMedia.push(convertMediaResponseToCollectionMedia(media));
    } else {
      newSelectedMedia = selectedMedia.filter((anime) => anime.id !== media.id);
    }
    setSelectedMedia(newSelectedMedia);
  };

  if (animeList.isLoading) {
    return <p>{t("loading.label")}</p>;
  }

  if (!animeList.data) {
    return <p>{t("collectionList.modal.addEditCollection.animeList.error.notFound")}</p>;
  }

  return (
    <>
      <div
        className={css`
          text-align: center;
        `}
      >
        <p>{t("collectionList.modal.addEditCollection.animeList.title")}</p>
      </div>
      <div
        className={css`
          height: 500px;
          overflow-y: scroll;
        `}
      >
        {animeList.data.Page.media.map((media) => (
          <AnimeOptionWrapper key={media.id}>
            <Checkbox
              isChecked={isMediaSelected(media.id)}
              onChange={(event) => onMediaSelected(event, media)}
              label={getTitle(media.title)}
            />
          </AnimeOptionWrapper>
        ))}
        <Pagination pageInfo={animeList.data.Page.pageInfo} onPageChange={onPageChange} />
      </div>
    </>
  );
};
export default AnimeListToPick;
