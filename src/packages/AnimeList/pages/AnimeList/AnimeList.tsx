import { css } from "@emotion/css";
import styled from "@emotion/styled";
import React, { FC, useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { fetchAnimeList } from "../../../../api/Anime";
import { AnimeCard, AnimeListWrapper, Center, Pagination } from "../../../../components/Components";
import { WINDOW_WIDTH } from "../../../../constants/constants";
import { AbortControllerContext } from "../../../../context/AbortControllerContext";
import { t } from "../../../../i18n/i18n";
import { MediaPageResponse } from "../../../../models/Anime";
import { RequestType } from "../../../../models/Response";
import { getTitle } from "../../../../utils/utils";
import { parse } from "query-string";

export const ANIME_PER_PAGE = 50;

const AnimeListPage = styled.div`
  padding-left: 2rem;
  padding-right: 2rem;
  position: relative;
  height: 100vh;

  @media (max-width: ${WINDOW_WIDTH.md}) {
    padding: 0;
  }
`;

const AnimeList: FC = () => {
  const history = useHistory();
  const { signal } = useContext(AbortControllerContext);
  const [animeList, setAnimeList] = useState<RequestType<MediaPageResponse | null>>({
    isLoading: false,
    data: null,
    error: null,
  });

  useEffect(() => {
    (async () => {
      const { page } = parse(history.location.search);
      const pageNumber = page ? +page : 1;
      await getAnimeList(pageNumber);
    })();
  }, [window.location.href]);

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
    const searchParams = new URLSearchParams();
    searchParams.set("page", pageNumber.toString());
    history.push(`?${searchParams.toString()}`);
  };

  if (!animeList.data && animeList.isLoading) {
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
                title={getTitle(anime.title)}
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
