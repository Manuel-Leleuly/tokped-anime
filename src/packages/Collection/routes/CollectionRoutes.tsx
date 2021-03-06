import React, { lazy } from "react";
import { Route, Switch } from "react-router-dom";
import { Page } from "../../../components/Components";

const PageRoutes = {
  collectionList: "/collection",
  collectionDetail: "/collection/:collectionId",
};

const CollectionListPage = lazy(() => import("../pages/CollectionList/Collection"));
const CollectionDetailPage = lazy(() => import("../pages/CollectionDetail/CollectionDetail"));

const CollectionRoutes = () => {
  const renderCollectionPage = (Component: any) => (props: any) => {
    return <Component {...props} />;
  };

  return (
    <Page>
      <Switch>
        <Route exact path={PageRoutes.collectionList} render={renderCollectionPage(CollectionListPage)} />
        <Route exact path={PageRoutes.collectionDetail} render={renderCollectionPage(CollectionDetailPage)} />
      </Switch>
    </Page>
  );
};
export default CollectionRoutes;
