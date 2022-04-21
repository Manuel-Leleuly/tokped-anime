import React, { lazy } from "react";
import { Route, Switch } from "react-router-dom";

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
    <Switch>
      <Route exact path={PageRoutes.animeList} render={renderAnimeListPage(AnimeListPage)} />
      <Route path={PageRoutes.animeDetail} render={renderAnimeListPage(AnimeDetailPage)} />
    </Switch>
  );
};
export default AnimeListRoutes;
