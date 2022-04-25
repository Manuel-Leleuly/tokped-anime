import React, { ChangeEvent, FC, useState } from "react";
import { CollectionList, CollectionMedia } from "../../../../../../models/Collection";
import { Modal } from "../../../../../../components/Components";
import CollectionForm from "./CollectionForm";
import AnimeListToPick from "./AnimeListToPick";
import { updateCollectionListToLocalStorage } from "../../../../../../utils/utils";
import { t } from "../../../../../../i18n/i18n";

interface Props {
  collectionList: CollectionList;
  onSubmitSuccess: () => void;
  onCancel: () => void;
  isEdit?: boolean;
  selectedCollectionName?: string;
  collectionId?: number;
}

enum COLLECTION_MODAL_STEPS {
  "FORM" = "FORM",
  "ANIME_LIST" = "ANIME_LIST",
}

const AddCollectionModal: FC<Props> = (props) => {
  const { collectionList, onSubmitSuccess, onCancel, isEdit, collectionId, selectedCollectionName } = props;

  const [selectedStep, setSelectedStep] = useState<COLLECTION_MODAL_STEPS>(COLLECTION_MODAL_STEPS.FORM);
  const [collectionName, setCollectionName] = useState<string>(selectedCollectionName || "");
  const [selectedMedia, setSelectedMedia] = useState<CollectionMedia[]>([]);
  const [isModalLoading, setIsModalLoading] = useState<boolean>(false);

  const handleCollectionNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCollectionName(event.target.value);
  };

  const onSubmit = () => {
    setIsModalLoading(true);
    const newCollectionList = [...collectionList];
    if (isEdit && selectedCollectionName && collectionId) {
      const selectedCollectionIndex = newCollectionList.findIndex((collection) => collection.id === collectionId);
      if (selectedCollectionIndex >= 0) {
        newCollectionList[selectedCollectionIndex].collectionName = collectionName;
      }
    } else {
      newCollectionList.push({
        collectionName,
        id: 1,
        animeList: selectedMedia,
      });
    }
    updateCollectionListToLocalStorage(newCollectionList);
    setIsModalLoading(false);
    onSubmitSuccess();
  };

  const renderErrMessage = () => {
    if (selectedStep === COLLECTION_MODAL_STEPS.FORM) {
      if (!collectionName.length) {
        return t("collectionList.modal.addEditCollection.form.error.empty");
      } else {
        const findCollection = collectionList.find((collection) => collection.collectionName === collectionName);
        if (!!findCollection) {
          return t("collectionList.modal.addEditCollection.form.error.alreadyExist");
        }

        const regex = new RegExp(/a-zA-Z0-9!@#\$%\^\&*\)\(+=._-/g);
        if (collectionName.match(regex)) {
          return t("collectionList.modal.addEditCollection.form.error.specialChar");
        }
      }
    }
  };

  const renderForm = () => (
    <CollectionForm
      collectionName={collectionName}
      onCollectionNameChange={handleCollectionNameChange}
      errorMessage={renderErrMessage()}
    />
  );

  const renderAnimeList = () => {
    return <AnimeListToPick selectedMedia={selectedMedia} setSelectedMedia={setSelectedMedia} />;
  };

  const renderContent = () => {
    switch (selectedStep) {
      case COLLECTION_MODAL_STEPS.FORM:
        return renderForm();
      case COLLECTION_MODAL_STEPS.ANIME_LIST:
        return renderAnimeList();
      default:
        break;
    }
  };

  const onModalSubmit = () => {
    switch (selectedStep) {
      case COLLECTION_MODAL_STEPS.FORM:
        if (isEdit) onSubmit();
        else setSelectedStep(COLLECTION_MODAL_STEPS.ANIME_LIST);
        break;
      case COLLECTION_MODAL_STEPS.ANIME_LIST:
        onSubmit();
        break;
      default:
        break;
    }
  };

  const isModalDisabled = (): boolean => {
    switch (selectedStep) {
      case COLLECTION_MODAL_STEPS.FORM:
        return !!renderErrMessage();
      case COLLECTION_MODAL_STEPS.ANIME_LIST:
        return !selectedMedia.length;
      default:
        return false;
    }
  };

  return (
    <Modal
      isDisabled={isModalDisabled()}
      onCancel={onCancel}
      cancelText={t("modal.cancel")}
      onSubmit={onModalSubmit}
      submitText={t("modal.submit")}
    >
      {renderContent()}
    </Modal>
  );
};
export default AddCollectionModal;
