import * as React from 'react';
import { Redirect, Route, RouteProps, BrowserRouter } from 'react-router-dom';
//import { AppContainer } from "src/containers/app";

const SearchPage = React.lazy(() => import('../containers/main/main'));

const Routes: React.FC<RouteProps> = () => (
  <BrowserRouter>
    <React.Suspense fallback={<div>Загрузка...</div>}>
      <Route exact path="/" render={() => <Redirect to="/chart" />} />
      <Route exact path="/chart" component={SearchPage} />
    </React.Suspense>
  </BrowserRouter>
);

export default Routes;
