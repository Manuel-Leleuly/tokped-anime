import { css } from "@emotion/css";
import styled from "@emotion/styled";
import React, { FC } from "react";
import { t } from "../../../i18n/i18n";
import { PageInfo } from "../../../models/Anime";
import { ButtonLink } from "../index";

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
        <ButtonLink
          onClick={() => onPageChange(pageInfo.currentPage - 1)}
          label={t("pagination.prev.label")}
          buttonClassName={css`
            margin-right: 10px;
          `}
          isDisabled={pageInfo.currentPage === 1}
        />
        <ButtonLink
          onClick={() => onPageChange(pageInfo.currentPage + 1)}
          isDisabled={!pageInfo.hasNextPage}
          label={t("pagination.next.label")}
        />
      </div>
    </PaginationWrapper>
  );
};
export default Pagination;
