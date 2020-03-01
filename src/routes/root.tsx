import * as React from 'react';
import { Route, RouteProps, BrowserRouter } from 'react-router-dom';

import AppProvider from '../context/provider';

const SearchPage = React.lazy(() => import('../containers/main/main'));

const Routes: React.FC<RouteProps> = () => (
  <BrowserRouter>
    <React.Suspense fallback={<div>Загрузка...</div>}>
      <AppProvider>
        <Route exact path="/" component={SearchPage} />
      </AppProvider>
    </React.Suspense>
  </BrowserRouter>
);

export default Routes;
