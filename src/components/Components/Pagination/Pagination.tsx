import Button from "@atlaskit/button";
import { css } from "@emotion/css";
import styled from "@emotion/styled";
import React, { FC } from "react";
import { t } from "../../../i18n/i18n";
import { PageInfo } from "../../../models/Anime";

interface Props {
  pageInfo: PageInfo;
  onPageChange: (pageNumber: number) => void;
}

const PaginationWrapper = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Pagination: FC<Props> = (props) => {
  const { pageInfo, onPageChange } = props;

  return (
    <PaginationWrapper>
      <div
        className={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
        `}
      >
        <Button
          appearance="link"
          onClick={() => onPageChange(pageInfo.currentPage - 1)}
          isDisabled={pageInfo.currentPage === 1}
          className={css`
            margin-right: 10px;
          `}
        >
          {t("pagination.prev.label")}
        </Button>
        <Button
          appearance="link"
          onClick={() => onPageChange(pageInfo.currentPage + 1)}
          isDisabled={!pageInfo.hasNextPage}
        >
          {t("pagination.next.label")}
        </Button>
      </div>
    </PaginationWrapper>
  );
};
export default Pagination;
