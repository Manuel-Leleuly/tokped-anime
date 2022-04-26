import * as T from "io-ts";

export const PageInfo = T.type({
  currentPage: T.number,
  hasNextPage: T.boolean,
  lastPage: T.number,
  perPage: T.number,
  total: T.number,
});

export type PageInfo = T.TypeOf<typeof PageInfo>;

export const MediaResponse = T.type({
  id: T.number,
  title: T.type({
    english: T.union([T.string, T.null]),
    native: T.union([T.string, T.null]),
  }),
  description: T.union([T.string, T.null]),
  seasonYear: T.union([T.number, T.null]),
  bannerImage: T.union([T.string, T.null]),
  coverImage: T.type({
    extraLarge: T.union([T.string, T.null]),
    large: T.union([T.string, T.null]),
    medium: T.union([T.string, T.null]),
  }),
});

export type MediaResponse = T.TypeOf<typeof MediaResponse>;

export const MediaListResponse = T.array(MediaResponse);

export type MediaListResponse = T.TypeOf<typeof MediaListResponse>;

export const MediaPageResponse = T.type({
  Page: T.type({
    media: MediaListResponse,
    pageInfo: PageInfo,
  }),
});

export type MediaPageResponse = T.TypeOf<typeof MediaPageResponse>;

export const CharacterDetail = T.type({
  id: T.number,
  name: T.type({
    full: T.union([T.string, T.null]),
    native: T.union([T.string, T.null]),
  }),
  image: T.union([
    T.type({
      medium: T.union([T.string, T.null]),
    }),
    T.null,
  ]),
});

export type CharacterDetail = T.TypeOf<typeof CharacterDetail>;

export const CharacterNodes = T.array(CharacterDetail);

export type CharacterNodes = T.TypeOf<typeof CharacterNodes>;

export const CharacterListResponse = T.type({
  nodes: CharacterNodes,
});

export type CharacterListResponse = T.TypeOf<typeof CharacterListResponse>;

export const AnimeDetailResponse = T.type({
  Media: T.type({
    id: T.number,
    title: T.type({
      english: T.union([T.string, T.null]),
      native: T.union([T.string, T.null]),
    }),
    trailer: T.union([
      T.type({
        id: T.union([T.string, T.null]),
        site: T.union([T.string, T.null]),
        thumbnail: T.union([T.string, T.null]),
      }),
      T.null,
    ]),
    description: T.union([T.string, T.null]),
    bannerImage: T.union([T.string, T.null]),
    characters: CharacterListResponse,
    episodes: T.union([T.number, T.null]),
    genres: T.union([T.array(T.string), T.null]),
    averageScore: T.union([T.number, T.null]),
    coverImage: T.type({
      extraLarge: T.union([T.string, T.null]),
      large: T.union([T.string, T.null]),
      medium: T.union([T.string, T.null]),
    }),
    seasonYear: T.union([T.number, T.null]),
  }),
});

export type AnimeDetailResponse = T.TypeOf<typeof AnimeDetailResponse>;
