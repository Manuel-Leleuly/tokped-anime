import { css } from "@emotion/css";
import styled from "@emotion/styled";
import React, { FC, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAnimeList } from "../../../../api/Anime";
import { AnimeCard, Center, Pagination } from "../../../../components/Components";
import { WINDOW_WIDTH } from "../../../../constants/constants";
import AbortControllerContextProvider, { AbortControllerContext } from "../../../../context/AbortControllerContext";
import { currentLanguage, LANGUAGE_CODES, t } from "../../../../i18n/i18n";
import { MediaPageResponse, MediaResponse } from "../../../../models/Anime";
import { RequestType } from "../../../../models/Response";

const ANIME_PER_PAGE = 50;

const AnimeListPage = styled.div`
  padding-left: 2rem;
  padding-right: 2rem;
  position: relative;
  height: 100vh;

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

const AnimeList: FC = (props) => {
  const { signal } = useContext(AbortControllerContext);
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

  const getTitle = (media: MediaResponse): string => {
    const { title } = media;
    if (currentLanguage === LANGUAGE_CODES.en && title && title.english) return title.english;
    if (currentLanguage === LANGUAGE_CODES.jp && title && title.native) return title.native;
    return "";
  };

  if (!animeList.data || animeList.isLoading) {
    return (
      <span
        className={css({
          height: "100vh",
        })}
      >
        <AnimeListPage>
          <Center>
            <p>{t("loading.label")}</p>
          </Center>
        </AnimeListPage>
      </span>
    );
  }

  if (!animeList.data) {
    return (
      <AnimeListPage>
        <span
          className={css({
            height: "100vh",
          })}
        >
          <Center>
            <p>{t("animeList.notFound.label")}</p>
          </Center>
        </span>
      </AnimeListPage>
    );
  }

  return (
    <>
      <AnimeListPage>
        <AnimeListWrapper>
          {animeList.data.Page.media.map((anime) => (
            <Link
              to={`/${anime.id}`}
              key={anime.id}
              className={css({
                margin: "auto",
              })}
            >
              <AnimeCard
                mediumImageUrl={anime.coverImage.medium}
                releaseYear={anime.seasonYear || undefined}
                title={getTitle(anime)}
              />
            </Link>
          ))}
        </AnimeListWrapper>
        <Pagination onPageChange={onPageChange} pageInfo={animeList.data.Page.pageInfo} />
        <br />
      </AnimeListPage>
    </>
  );
};

export default AnimeList;
