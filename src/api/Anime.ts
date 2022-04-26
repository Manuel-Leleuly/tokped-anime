import { AnimeDetailResponse, MediaPageResponse } from "../models/Anime";
import { apiCall } from "./Axios";

export const fetchAnimeList = (pageNumber: number, limitPerPage: number, abortSignal?: AbortSignal) => {
  const query = `
        query($page: Int!, $perPage: Int!) {
            Page(page: $page, perPage: $perPage){
                pageInfo {
                    total
                    perPage
                    currentPage
                    lastPage
                    hasNextPage
                }
                media(type: ANIME, sort: TRENDING_DESC){
                    id
                    title {
                        english
                        native
                    }
                    description
                    seasonYear
                    bannerImage
                    coverImage {
                        extraLarge
                        large
                        medium
                    }
                }
            }
        }
    `;
  const variables = {
    page: pageNumber,
    perPage: limitPerPage,
  };

  return apiCall({ query, variables, abortSignal, Codec: MediaPageResponse });
};

export const fetchAnimeDetail = (animeId: number, abortSignal?: AbortSignal) => {
  const query = `
        query($id: Int!) {
            Media(id: $id){
                id
                title {
                  english
                  native
                }
                trailer {
                  id
                  site
                  thumbnail
                }
                description (asHtml: true)
                bannerImage
                characters(sort: ROLE, perPage: 10) {
                  nodes {
                    id
                    name {
                      full
                      native
                    }
                    image {
                      medium
                    }
                  }
                }
                episodes
                genres
                averageScore
                coverImage {
                  extraLarge
                  large
                  medium
                }
                seasonYear
              }
        }
    `;
  const variables = {
    id: animeId,
  };
  return apiCall({ query, variables, abortSignal, Codec: AnimeDetailResponse });
};
