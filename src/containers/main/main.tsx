import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { useLocation } from 'react-router-dom';
import { IStore } from 'model/store';
import { Table } from 'components/table';
import { getPersons, addFavouritePerson } from 'model/actions';
import { Filters } from 'components/filters';
import { getSortedPersons } from 'model/selectors';
import styles from './main.scss';

import { IPerson } from 'models';
import { getQuery } from 'src/getQuery';

type AppDispatch = ThunkDispatch<IStore, any, AnyAction>;

interface IMainContainerProps {}

const Main: React.FC<IMainContainerProps> = ({}) => {
  const location = useLocation();
  const query = getQuery(location);

  const dispatch: AppDispatch = useDispatch();
  const selectPersonsWithFilter = React.useMemo(getSortedPersons, []);
  const persons = useSelector<IStore, IPerson[]>(state => selectPersonsWithFilter(state, query));

  React.useEffect(() => {
    dispatch(getPersons());
  }, []);

  const handleAddFavourite = (id: number) => {
    dispatch(addFavouritePerson(id));
  };

  return (
    <div className={styles.layout}>
      <Filters />
      <Table persons={persons} onAddFavourite={handleAddFavourite} />
    </div>
  );
};

export default Main;
