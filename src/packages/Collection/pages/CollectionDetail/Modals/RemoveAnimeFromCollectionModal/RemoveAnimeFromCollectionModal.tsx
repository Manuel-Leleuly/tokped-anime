import React, { FC } from "react";
import { CollectionData, CollectionMedia } from "../../../../../../models/Collection";
import {
  getCollectionListFromLocalStorage,
  getTitle,
  updateCollectionListToLocalStorage,
} from "../../../../../../utils/utils";
import { Modal } from "../../../../../../components/Components";
import { t } from "../../../../../../i18n/i18n";
import { Trans } from "react-i18next";
import { css } from "@emotion/css";
import { WINDOW_WIDTH } from "../../../../../../constants/constants";

interface Props {
  collectionData: CollectionData;
  collectionMedia: CollectionMedia;
  onSubmitSuccess: () => void;
  onCancel: () => void;
}

const RemoveAnimeFromCollectionModal: FC<Props> = (props) => {
  const { collectionData, collectionMedia, onSubmitSuccess, onCancel } = props;

  const onSubmit = () => {
    const newCollectionList = getCollectionListFromLocalStorage();
    const newAnimeList = collectionData.animeList.filter((anime) => anime.id !== collectionMedia.id);
    const newCollectionData = { ...collectionData };
    newCollectionData.animeList = newAnimeList;

    const selectedCollectionDataIndex = newCollectionList.findIndex(
      (collection) => collection.id === collectionData.id
    );
    if (selectedCollectionDataIndex >= 0) {
      newCollectionList[selectedCollectionDataIndex] = newCollectionData;
      updateCollectionListToLocalStorage(newCollectionList);
    }
    onSubmitSuccess();
  };

  return (
    <Modal onSubmit={onSubmit} submitText={t("modal.submit")} onCancel={onCancel} cancelText={t("modal.cancel")}>
      <div
        className={css`
          overflow-wrap: break-word;
          text-wrap: normal;

          @media (max-width: ${WINDOW_WIDTH.md}) {
            width: 300px;
          }
        `}
      >
        <Trans i18nKey="collectionDetail.modal.removeAnimeFromCollection.message">
          Are you sure you want to remove <strong>{{ animeTitle: getTitle(collectionMedia.title) }}</strong> from
          collection <strong>{{ collectionName: collectionData.collectionName }}</strong> ?
        </Trans>
      </div>
    </Modal>
  );
};
export default RemoveAnimeFromCollectionModal;
