import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { Fallback } from "./components/Components";
import Nav from "./components/Nav/Nav";

const AnimeListRoutes = lazy(() => import("./packages/AnimeList/routes/AnimeListRoutes"));
const CollectionRoutes = lazy(() => import("./packages/Collection/routes/CollectionRoutes"));

const AppRoutes = {
  animeList: "/",
  collection: "/collection",
};

function App() {
  const renderAppPage = (Component: any) => (props: any) => {
    return <Component {...props} />;
  };

  return (
    <>
      <Nav />
      <Suspense fallback={<Fallback />}>
        <Switch>
          <Route path={AppRoutes.collection} render={renderAppPage(CollectionRoutes)} />
          <Route path={AppRoutes.animeList} render={renderAppPage(AnimeListRoutes)} />

          {/* TODO: add error page */}
          <Route path="*" render={renderAppPage(AnimeListRoutes)} />
        </Switch>
      </Suspense>
    </>
  );
}

export default App;
