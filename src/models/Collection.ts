import * as T from "io-ts";

export const CollectionMedia = T.type({
  id: T.number,
  title: T.type({
    english: T.union([T.string, T.null]),
    native: T.union([T.string, T.null]),
  }),
  seasonYear: T.union([T.string, T.null]),
  coverImage: T.type({
    extraLarge: T.union([T.string, T.null]),
    large: T.union([T.string, T.null]),
    medium: T.union([T.string, T.null]),
  }),
});

export type CollectionMedia = T.TypeOf<typeof CollectionMedia>;

export const CollectionData = T.type({
  id: T.number,
  collectionName: T.string,
  animeList: T.array(CollectionMedia),
});

export type CollectionData = T.TypeOf<typeof CollectionData>;

export const CollectionList = T.array(CollectionData);

export type CollectionList = T.TypeOf<typeof CollectionList>;
