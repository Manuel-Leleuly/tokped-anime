import { CollectionList } from "../models/Collection";
import { COLLECTION_LOCAL_STORAGE_KEY } from "../constants/constants";

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
