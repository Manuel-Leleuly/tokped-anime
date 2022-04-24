import { css } from "@emotion/css";
import styled from "@emotion/styled";
import React, { FC, useContext, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { fetchAnimeDetail } from "../../../../api/Anime";
import { BannerCard, Center } from "../../../../components/Components";
import { WINDOW_WIDTH } from "../../../../constants/constants";
import AbortControllerContextProvider, { AbortControllerContext } from "../../../../context/AbortControllerContext";
import { currentLanguage, LANGUAGE_CODES, t } from "../../../../i18n/i18n";
import { AnimeDetailResponse } from "../../../../models/Anime";
import { RequestType } from "../../../../models/Response";
import Cast from "./Cast";
import Description from "./Description";
import Trailer from "./Trailer";

interface Props extends RouteComponentProps<{ animeId: string }> {}

const AnimeDetailPage = styled.div`
  padding-left: 2rem;
  padding-right: 2rem;
  position: relative;
  height: 100vh;

  @media (max-width: ${WINDOW_WIDTH.md}) {
    padding: 0;
  }
`;

const AnimeDescAndCast = styled.div`
  margin-top: 20px;

  display: grid;
  grid-template-columns: 2fr 1fr;

  @media (max-width: ${WINDOW_WIDTH.md}) {
    grid-template-columns: 1fr;
  }
`;

const AnimeDetail: FC<Props> = (props) => {
  const { signal } = useContext(AbortControllerContext);
  const {
    match: {
      params: { animeId },
    },
  } = props;

  const [animeDetail, setAnimeDetail] = useState<RequestType<AnimeDetailResponse | null>>({
    isLoading: false,
    data: null,
    error: null,
  });

  useEffect(() => {
    (async () => {
      await getAnimeDetail();
    })();
  }, []);

  const getAnimeDetail = async () => {
    if (animeDetail.isLoading) return;
    setAnimeDetail((prevState) => ({ ...prevState, isLoading: true }));
    fetchAnimeDetail(+animeId, signal)
      .then((result) => {
        if (result.response && result.response.data) {
          const { data } = result.response;
          setAnimeDetail((prevState) => ({ ...prevState, data: data.data, error: null, isLoading: false }));
        } else {
          throw result.error;
        }
      })
      .catch((error) => {
        setAnimeDetail((prevState) => ({ ...prevState, error, isLoading: false }));
      });
  };

  console.log(animeDetail);

  if (animeDetail.isLoading) {
    return (
      <span
        className={css({
          height: "100vh",
        })}
      >
        <AnimeDetailPage>
          <Center>
            <p>{t("loading.label")}</p>
          </Center>
        </AnimeDetailPage>
      </span>
    );
  }

  if (!animeDetail.data) {
    return (
      <AnimeDetailPage>
        <span
          className={css({
            height: "100vh",
          })}
        >
          <Center>
            <p>{t("animeList.notFound.label")}</p>
          </Center>
        </span>
      </AnimeDetailPage>
    );
  }

  const renderTitle = (): string => {
    if (animeDetail.data && animeDetail.data.Media.title) {
      const {
        data: {
          Media: { title },
        },
      } = animeDetail;
      switch (currentLanguage) {
        case LANGUAGE_CODES.en:
          return title.english || "";
        case LANGUAGE_CODES.jp:
          return title.native || "";
        default:
          return "";
      }
    }
    return "";
  };

  return (
    <>
      <BannerCard bannerImage={animeDetail.data.Media.bannerImage} title={renderTitle()} />
      {animeDetail.data.Media.trailer && (
        <Trailer site={animeDetail.data.Media.trailer.site || ""} videoCode={animeDetail.data.Media.trailer.id || ""} />
      )}
      <AnimeDescAndCast>
        <Description description={animeDetail.data.Media.description || ""} />
        <Cast allCasts={animeDetail.data.Media.characters.nodes} />
      </AnimeDescAndCast>
      <p>this is the anime detail page</p>
      <p>{animeId}</p>
    </>
  );
};
export default AnimeDetail;
