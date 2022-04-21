import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { getLocalStorageLanguage, t } from "../../i18n/i18n";
import { css } from "@emotion/css";
import Button from "@atlaskit/button";

const Nav = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = () => {
    const localLanguage = getLocalStorageLanguage();
    let newLanguage = "en-US";
    if (localLanguage === "en-US") {
      newLanguage = "jp-JP";
    }
    i18n.changeLanguage(newLanguage);
  };

  const flexDisplay = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  return (
    <>
      <nav>
        <div
          className={css({
            ...flexDisplay,
            padding: "0.5rem 2rem",
          })}
        >
          <p>Tokped Anime</p>
          <div
            className={css({
              ...flexDisplay,
              width: "250px",
            })}
          >
            <Link
              to="/"
              className={css({
                textDecoration: "none",
                color: "black",
                "&:hover": {
                  color: "gray",
                },
              })}
            >
              <p>{t("nav.menu.animeList.label")}</p>
            </Link>
            <Link
              to="/collection"
              className={css({
                textDecoration: "none",
                color: "black",
                "&:hover": {
                  color: "gray",
                },
              })}
            >
              <p>{t("nav.menu.collection.label")}</p>
            </Link>
          </div>
          <Button
            appearance="subtle-link"
            onClick={handleLanguageChange}
            className={css({
              color: "black !important",
              "&:hover": {
                textDecoration: "none !important",
                color: "gray !important",
              },
            })}
          >
            {t("nav.menu.language.button.label")}
          </Button>
        </div>
      </nav>
    </>
  );
};
export default Nav;
