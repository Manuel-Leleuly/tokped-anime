import React, { ChangeEvent, FC, useState } from "react";
import { CollectionData, CollectionList, CollectionMedia } from "../../../../../../models/Collection";
import { Modal } from "../../../../../../components/Components";
import CollectionForm from "./CollectionForm";
import AnimeListToPick from "./AnimeListToPick";
import {
  convertAnimeDetailResponseToCollectionMedia,
  generateUniqueCollectionId,
  updateCollectionListToLocalStorage,
} from "../../../../../../utils/utils";
import { t } from "../../../../../../i18n/i18n";
import CollectionListToPick from "./CollectionListToPick";
import { AnimeDetailResponse } from "../../../../../../models/Anime";

interface Props {
  collectionList: CollectionList;
  onSubmitSuccess: () => void;
  onCancel: () => void;
  isEdit?: boolean;
  selectedCollectionName?: string;
  collectionId?: number;
  isFromAnimeDetail?: boolean;
  selectedAnime?: AnimeDetailResponse;
}

enum COLLECTION_MODAL_STEPS {
  "FORM" = "FORM",
  "ANIME_LIST" = "ANIME_LIST",
  "COLLECTION_LIST" = "COLLECTION_LIST",
}

const AddCollectionModal: FC<Props> = (props) => {
  const {
    collectionList,
    onSubmitSuccess,
    onCancel,
    isEdit,
    collectionId,
    selectedCollectionName,
    isFromAnimeDetail,
    selectedAnime,
  } = props;

  const [selectedStep, setSelectedStep] = useState<COLLECTION_MODAL_STEPS>(() => {
    if (isFromAnimeDetail && selectedAnime) {
      if (!!collectionList.length) return COLLECTION_MODAL_STEPS.COLLECTION_LIST;
      return COLLECTION_MODAL_STEPS.FORM;
    }
    return COLLECTION_MODAL_STEPS.FORM;
  });
  const [collectionName, setCollectionName] = useState<string>(selectedCollectionName || "");
  const [selectedMedia, setSelectedMedia] = useState<CollectionMedia[]>([]);
  const [isModalLoading, setIsModalLoading] = useState<boolean>(false);
  const [selectedCollection, setSelectedCollection] = useState<CollectionData | null>(null);

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
    } else if (isFromAnimeDetail && selectedAnime && !!collectionList.length && selectedCollection) {
      const selectedCollectionIndex = newCollectionList.findIndex(
        (collection) => collection.id === selectedCollection.id
      );
      if (selectedCollectionIndex >= 0) {
        newCollectionList[selectedCollectionIndex].animeList.push(
          convertAnimeDetailResponseToCollectionMedia(selectedAnime)
        );
      }
    } else {
      const newSelectedMedia = [...selectedMedia];
      if (selectedAnime) {
        newSelectedMedia.push(convertAnimeDetailResponseToCollectionMedia(selectedAnime));
      }
      newCollectionList.push({
        collectionName,
        id: generateUniqueCollectionId(collectionList),
        animeList: newSelectedMedia,
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

        const regex = new RegExp(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi);
        if (!!collectionName.match(regex)) {
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
      onSeeCollectionListButtonClick={() => setSelectedStep(COLLECTION_MODAL_STEPS.COLLECTION_LIST)}
      showSeeCollectionListButton={!!collectionList.length && !isEdit}
    />
  );

  const renderAnimeList = () => {
    return <AnimeListToPick selectedMedia={selectedMedia} setSelectedMedia={setSelectedMedia} />;
  };

  const renderCollectionListToPick = () => {
    const isRadioDisabled = (selectedCollectionData: CollectionData): boolean => {
      if (selectedAnime) {
        return !!selectedCollectionData.animeList.find((anime) => anime.id === selectedAnime.Media.id);
      }
      return false;
    };

    return (
      <CollectionListToPick
        collectionList={collectionList}
        selectedCollection={selectedCollection}
        setSelectedCollection={setSelectedCollection}
        isRadioDisabled={isRadioDisabled}
        onCreateANewCollectionClick={() => setSelectedStep(COLLECTION_MODAL_STEPS.FORM)}
      />
    );
  };

  const renderContent = () => {
    switch (selectedStep) {
      case COLLECTION_MODAL_STEPS.FORM:
        return renderForm();
      case COLLECTION_MODAL_STEPS.ANIME_LIST:
        return renderAnimeList();
      case COLLECTION_MODAL_STEPS.COLLECTION_LIST:
        return renderCollectionListToPick();
      default:
        break;
    }
  };

  const onModalSubmit = () => {
    if (isFromAnimeDetail && selectedAnime) return onSubmit();

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
    if (isFromAnimeDetail && selectedAnime && selectedStep !== COLLECTION_MODAL_STEPS.FORM) {
      return !selectedCollection;
    }

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
