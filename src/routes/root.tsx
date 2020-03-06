import * as React from 'react';
import { Route, RouteProps, BrowserRouter, Redirect } from 'react-router-dom';

import AppProvider from '../context/provider';

const ReduxPage = React.lazy(() => import('../containers/main/main'));
const EffectorPage = React.lazy(() => import('../containers/mainEffector/main'));

const Routes: React.FC<RouteProps> = () => (
  <BrowserRouter>
    <React.Suspense fallback={<div>Загрузка...</div>}>
      <AppProvider>
        <Route exact path="/" render={() => <Redirect to="/redux" />} />
        <Route exact path="/redux" component={ReduxPage} />
        <Route exact path="/effector" component={EffectorPage} />
      </AppProvider>
    </React.Suspense>
  </BrowserRouter>
);

export default Routes;
