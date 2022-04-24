import { MediaPageResponse } from "../models/Anime";
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
