import { css } from "@emotion/css";
import styled from "@emotion/styled";
import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAnimeList } from "../../../../api/Anime";
import { AnimeCard, Pagination } from "../../../../components/Components";
import { currentLanguage, LANGUAGE_CODES } from "../../../../i18n/i18n";
import { MediaPageResponse, MediaResponse } from "../../../../models/Anime";
import { RequestType } from "../../../../models/Response";

const ANIME_PER_PAGE = 50;

const AnimeListWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 50px;
`;

const AnimeList: FC = (props) => {
  const [animeList, setAnimeList] = useState<RequestType<MediaPageResponse | null>>({
    isLoading: false,
    data: null,
    error: null,
  });

  const [selectedPage, setSelectedPage] = useState<number>(1);

  useEffect(() => {
    (async () => {
      await getAnimeList(selectedPage);
    })();
  }, [selectedPage]);

  const getAnimeList = async (pageNumber: number) => {
    if (animeList.isLoading) return;
    setAnimeList((prevState) => ({ ...prevState, isLoading: true }));
    fetchAnimeList(pageNumber, ANIME_PER_PAGE)
      .then((result) => {
        if (result.response && result.response.data) {
          const { data } = result.response;
          setAnimeList((prevState) => ({ ...prevState, data: data.data, error: null }));
        } else {
          throw result.error;
        }
      })
      .catch((error) => {
        console.error(error);
        setAnimeList((prevState) => ({ ...prevState, error }));
      })
      .finally(() => {
        setAnimeList((prevState) => ({ ...prevState, isLoading: false }));
      });
  };

  const onPageChange = (pageNumber: number) => {
    setSelectedPage(pageNumber);
  };

  if (!animeList.data) {
    return (
      <>
        <p>no anime found</p>
      </>
    );
  }

  const getTitle = (media: MediaResponse): string => {
    const { title } = media;
    if (currentLanguage === LANGUAGE_CODES.en && title && title.english) return title.english;
    if (currentLanguage === LANGUAGE_CODES.jp && title && title.native) return title.native;
    return "";
  };

  return (
    <>
      <div
        className={css`
          padding-left: 20px;
          padding-right: 20px;
        `}
      >
        <AnimeListWrapper>
          {animeList.data.Page.media.map((anime) => (
            <Link to={`/${anime.id}`} key={anime.id}>
              <AnimeCard
                mediumImageUrl={anime.coverImage.medium}
                releaseYear={anime.seasonYear || undefined}
                title={getTitle(anime)}
              />
            </Link>
          ))}
        </AnimeListWrapper>
      </div>
      <Pagination onPageChange={onPageChange} pageInfo={animeList.data.Page.pageInfo} />
    </>
  );
};
export default AnimeList;
