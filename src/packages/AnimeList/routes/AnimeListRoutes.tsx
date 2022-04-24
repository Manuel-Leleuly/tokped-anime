import React, { lazy } from "react";
import { Route, Switch } from "react-router-dom";
import { Page } from "../../../components/Components";

const PageRoutes = {
  animeList: "/",
  animeDetail: "/:animeId",
};

const AnimeListPage = lazy(() => import("../pages/AnimeList/AnimeList"));
const AnimeDetailPage = lazy(() => import("../pages/AnimeDetail/AnimeDetail"));

const AnimeListRoutes = () => {
  const renderAnimeListPage = (Component: any) => (props: any) => {
    return <Component {...props} />;
  };

  return (
    <Page>
      <Switch>
        <Route exact path={PageRoutes.animeList} render={renderAnimeListPage(AnimeListPage)} />
        <Route path={PageRoutes.animeDetail} render={renderAnimeListPage(AnimeDetailPage)} />
      </Switch>
    </Page>
  );
};
export default AnimeListRoutes;
