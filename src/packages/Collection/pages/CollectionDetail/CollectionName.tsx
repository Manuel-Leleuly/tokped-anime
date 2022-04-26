import React, { FC } from "react";
import { css } from "@emotion/css";
import Button from "@atlaskit/button";
import { t } from "../../../../i18n/i18n";
import { ButtonLink } from "../../../../components/Components";

interface Props {
  collectionName: string;
  onEditButtonClick: () => void;
}

const CollectionName: FC<Props> = (props) => {
  const { collectionName, onEditButtonClick } = props;

  return (
    <div
      className={css`
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      `}
    >
      <div
        className={css`
          margin-right: 5px;
          font-size: 30px;
        `}
      >
        {collectionName}
      </div>
      <div>
        [<ButtonLink onClick={onEditButtonClick} label={t("common.edit")} lightText />]
      </div>
    </div>
  );
};
export default CollectionName;
