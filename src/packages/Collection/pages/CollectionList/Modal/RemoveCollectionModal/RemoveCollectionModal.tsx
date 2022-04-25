import React, { FC } from "react";
import { CollectionData, CollectionList } from "../../../../../../models/Collection";
import { updateCollectionListToLocalStorage } from "../../../../../../utils/utils";
import { Modal } from "../../../../../../components/Components";
import { t } from "../../../../../../i18n/i18n";
import { Trans } from "react-i18next";
import { css } from "@emotion/css";
import { WINDOW_WIDTH } from "../../../../../../constants/constants";

interface Props {
  collectionData: CollectionData;
  onSubmitSuccess: () => void;
  onCancel: () => void;
  collectionList: CollectionList;
}

const RemoveCollectionModal: FC<Props> = (props) => {
  const { collectionData, onCancel, onSubmitSuccess, collectionList } = props;

  const onSubmit = () => {
    const newCollectionList = collectionList.filter((collection) => collection.id !== collectionData.id);
    updateCollectionListToLocalStorage(newCollectionList);
    onSubmitSuccess();
  };

  return (
    <Modal onCancel={onCancel} cancelText={t("modal.cancel")} submitText={t("modal.submit")} onSubmit={onSubmit}>
      <div
        className={css`
          overflow-wrap: break-word;
          text-wrap: normal;

          @media (max-width: ${WINDOW_WIDTH.md}) {
            width: 300px;
          }
        `}
      >
        <Trans i18nKey="collectionList.modal.removeCollection.message">
          Are you sure you want to remove <strong>{{ collectionName: collectionData.collectionName }}</strong>?
        </Trans>
      </div>
    </Modal>
  );
};
export default RemoveCollectionModal;
