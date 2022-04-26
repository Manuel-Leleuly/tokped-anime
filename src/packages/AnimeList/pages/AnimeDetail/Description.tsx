import styled from "@emotion/styled";
import React, { FC, ReactNode, useEffect, useState } from "react";
import { WINDOW_WIDTH } from "../../../../constants/constants";
import DOMPurify from "dompurify";
import { t } from "../../../../i18n/i18n";
import { css } from "@emotion/css";
import StarRatingComponent from "react-star-rating-component";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { CollectionList } from "../../../../models/Collection";
import { getCollectionListFromLocalStorage } from "../../../../utils/utils";
import { Link, useHistory } from "react-router-dom";
import { ButtonLink } from "../../../../components/Components";

interface Props {
  animeId: number;
  description: string | null;
  episodes: number | null;
  averageScore: number | null;
}

const DescriptionWrapper = styled.div`
  padding: 20px;
  margin: 20px;
  background: white;
  border: 2px solid black;
  border-radius: 10px;

  @media (max-width: ${WINDOW_WIDTH.md}) {
    padding: 10px;
    margin: 0;
  }
`;

const DescriptionTitle = styled.p`
  font-size: 20px;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Description: FC<Props> = (props) => {
  const { description, averageScore, episodes, animeId } = props;

  return (
    <DescriptionWrapper>
      {description && (
        <div>
          <DescriptionTitle>{t("animeDetail.description.description")}</DescriptionTitle>
          <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }} />
        </div>
      )}
      {episodes && (
        <div>
          <DescriptionTitle>{t("animeDetail.description.episodes")}</DescriptionTitle>
          <p>{episodes}</p>
        </div>
      )}
      {averageScore && (
        <div>
          <DescriptionTitle>{t("animeDetail.description.rating")}</DescriptionTitle>
          <StarRating averageScore={averageScore} />
        </div>
      )}
      <CollectionInfo animeId={animeId} />
    </DescriptionWrapper>
  );
};

interface StarRatingProps {
  averageScore: number;
}

const StarRating: FC<StarRatingProps> = (props) => {
  const { averageScore } = props;

  // convert 100-base average score to 5 star rating
  const rating = averageScore / 20;

  const starColor = "f1a20a";
  const starSize = 20;
  return (
    <div
      className={css({
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
      })}
    >
      <div
        className={css({
          marginRight: "5px",
        })}
      >
        <StarRatingComponent
          name="anime-rating"
          value={rating}
          editing={false}
          starColor={starColor}
          renderStarIcon={(index, value) => (
            <div className={css({ marginRight: "0.25rem" })}>
              {index <= value ? (
                <FaStar color={starColor} size={starSize} />
              ) : (
                <FaRegStar color={starColor} size={starSize} />
              )}
            </div>
          )}
          renderStarIconHalf={() => (
            <div className={css({ marginRight: "0.25rem" })}>
              <FaStarHalfAlt color={starColor} size={starSize} />
            </div>
          )}
        />
      </div>
      <p>{rating}</p>
    </div>
  );
};

interface CollectionInfoProps {
  animeId: number;
}

const CollectionInfo: FC<CollectionInfoProps> = (props) => {
  const history = useHistory();
  const { animeId } = props;

  const [selectedCollections, setSelectedCollections] = useState<CollectionList>([]);

  useEffect(() => {
    const collectionList = getCollectionListFromLocalStorage();
    const selectedCollectionList = collectionList.filter((collection) => {
      return !!collection.animeList.find((anime) => anime.id === animeId);
    });
    setSelectedCollections(selectedCollectionList);
  }, []);

  if (!selectedCollections.length) return <div />;

  return (
    <div>
      <DescriptionTitle>{t("animeDetail.description.collection")}</DescriptionTitle>
      <div
        className={css`
          display: flex;
          justify-content: start;
          align-items: center;
        `}
      >
        {selectedCollections.map((collection) => (
          <div
            key={collection.id}
            className={css`
              margin-right: 5px;
            `}
          >
            <ButtonLink
              onClick={() => history.push(`/collection/${collection.id}`)}
              label={collection.collectionName}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Description;
