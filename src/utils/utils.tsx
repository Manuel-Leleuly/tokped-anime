import { CollectionList, CollectionMedia } from "../models/Collection";
import { COLLECTION_LOCAL_STORAGE_KEY } from "../constants/constants";
import { currentLanguage, LANGUAGE_CODES } from "../i18n/i18n";
import { MediaResponse } from "../models/Anime";

export const getCollectionListFromLocalStorage = (): CollectionList => {
  const collectionList = localStorage.getItem(COLLECTION_LOCAL_STORAGE_KEY);
  if (!!collectionList) {
    return JSON.parse(collectionList) as CollectionList;
  }
  return [];
};

export const updateCollectionListToLocalStorage = (collectionList: CollectionList): boolean => {
  try {
    localStorage.setItem(COLLECTION_LOCAL_STORAGE_KEY, JSON.stringify(collectionList));
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getTitle = (title: { english: string | null; native: string | null }): string => {
  if (currentLanguage === LANGUAGE_CODES.en && title.english) {
    return title.english;
  }
  if (currentLanguage === LANGUAGE_CODES.jp && title.native) {
    return title.native;
  }
  return title.english || title.native || "";
};

export const convertMediaResponseToCollectionMedia = (media: MediaResponse): CollectionMedia => {
  return {
    title: media.title,
    id: media.id,
    coverImage: media.coverImage,
    seasonYear: media.seasonYear,
  };
};
