import React, { ChangeEvent, FC, useState } from "react";
import { CollectionList } from "../../../../../../models/Collection";
import { FieldText, Modal } from "../../../../../../components/Components";
import styled from "@emotion/styled";
import collection from "../../Collection";
import Button from "@atlaskit/button";
import { css } from "@emotion/css";

interface Props {
  collectionList: CollectionList;
  onSubmit: () => void;
  onCancel: () => void;
}

enum COLLECTION_MODAL_STEPS {
  "FORM" = "FORM",
  "COLLECTION_LIST" = "COLLECTION_LIST",
}

const AddCollectionModal: FC<Props> = (props) => {
  const { collectionList, onSubmit, onCancel } = props;

  const [selectedStep, setSelectedStep] = useState<COLLECTION_MODAL_STEPS>(
    !!collectionList.length ? COLLECTION_MODAL_STEPS.COLLECTION_LIST : COLLECTION_MODAL_STEPS.FORM
  );
  const [collectionName, setCollectionName] = useState<string>("");

  const handleCollectionNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCollectionName(event.target.value);
  };

  const renderHelperMessage = () => {
    if (selectedStep === COLLECTION_MODAL_STEPS.FORM) {
      if (!collectionName.length) {
        return "Collection name is required";
      } else {
        const findCollection = collectionList.find((collection) => collection.collectionName === collectionName);
        if (!!findCollection) {
          return "Collection name already exist";
        }

        const regex = new RegExp(/a-zA-Z0-9!@#\$%\^\&*\)\(+=._-/g);
        if (collectionName.match(regex)) {
          return "Collection name must not have special characters";
        }
      }
    }
  };

  const renderForm = () => {
    return (
      <>
        <FieldText
          label={"Collection Name"}
          name="collectionName"
          onChange={handleCollectionNameChange}
          value={collectionName}
          helperMessage={renderHelperMessage()}
        />
        {!collectionList.length && (
          <div
            className={css`
              width: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              margin-top: 10px;
            `}
          >
            <Button
              appearance="link"
              onClick={() => setSelectedStep(COLLECTION_MODAL_STEPS.COLLECTION_LIST)}
              className={css`
                text-decoration: none !important;
                :hover {
                  text-decoration: none !important;
                }
              `}
            >
              <div
                className={css`
                  color: black !important;
                  font-weight: normal;
                  :hover {
                    color: gray !important;
                  }
                `}
              >
                See collection list
              </div>
            </Button>
          </div>
        )}
      </>
    );
  };

  return (
    <Modal
      isDisabled={!!renderHelperMessage()}
      onCancel={onCancel}
      cancelText={"cancel"}
      onSubmit={onSubmit}
      submitText={"submit"}
    >
      {renderForm()}
    </Modal>
  );
};
export default AddCollectionModal;
