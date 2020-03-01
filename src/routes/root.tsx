import * as React from 'react';
import { Redirect, Route, RouteProps, BrowserRouter } from 'react-router-dom';
//import { AppContainer } from "src/containers/app";
import AppProvider from '../context/provider';

const SearchPage = React.lazy(() => import('../containers/main/main'));

const Routes: React.FC<RouteProps> = () => (
  <BrowserRouter>
    <React.Suspense fallback={<div>Загрузка...</div>}>
      <AppProvider>
        <Route exact path="/" render={() => <Redirect to="/chart" />} />
        <Route exact path="/chart" component={SearchPage} />
      </AppProvider>
    </React.Suspense>
  </BrowserRouter>
);

export default Routes;
