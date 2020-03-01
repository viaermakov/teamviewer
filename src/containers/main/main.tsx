import * as React from 'react';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { IStore } from 'model/store';
import { getPersons, addFavouritePerson } from 'model/actions';
import { getSortedPersons } from 'model/selectors';

import Context from 'src/context/createContext';
import { IPerson } from 'src/types';
import { getQuery } from 'src/getQuery';

import { Table } from 'components/table';
import { Filters } from 'components/filters';
import { TableIcon } from 'components/icons/table';
import { TileIcon } from 'components/icons/tile';
import { Tabs } from 'components/tabs';

import styles from './main.scss';

type AppDispatch = ThunkDispatch<IStore, any, AnyAction>;

interface IOption {
  id: number;
  label: string;
  value: string;
}

interface IMainContainerProps {}

const options: IOption[] = [
  { id: 0, label: 'ru', value: 'ru' },
  { id: 1, label: 'en', value: 'en' },
];

const Main: React.FC<IMainContainerProps> = ({}) => {
  const location = useLocation();
  const query = getQuery(location);
  const { lang, changeLang } = React.useContext(Context);

  const dispatch: AppDispatch = useDispatch();
  const selectPersonsWithFilter = React.useMemo(getSortedPersons, []);
  const persons = useSelector<IStore, IPerson[]>(state => selectPersonsWithFilter(state, query));
  const favouritesIds = useSelector<IStore, number[]>(state => state.main.favourite);
  const isLoading = useSelector<IStore, boolean>(state => state.main.isLoading);

  const [viewType, setViewType] = React.useState<'preview' | 'table'>('table');

  React.useEffect(() => {
    dispatch(getPersons());
  }, []);

  const handleChangeLang = (option: IOption) => {
    changeLang && changeLang(option.value);
  };

  const handleAddFavourite = (id: number) => {
    dispatch(addFavouritePerson(id));
  };

  const handleChangeViewOnTable = (): void => {
    setViewType('table');
  };
  const handleChangeViewOnTile = (): void => {
    setViewType('preview');
  };

  return (
    <div className={styles.layout}>
      <Tabs<IOption>
        className={styles.lang}
        onClick={handleChangeLang}
        options={options}
        value={lang}
      />
      <Filters />
      <div className={styles.viewTabs}>
        <TableIcon onClick={handleChangeViewOnTable} />
        <TileIcon onClick={handleChangeViewOnTile} />
      </div>
      <Table
        viewType={viewType}
        persons={persons}
        isLoading={isLoading}
        onAddFavourite={handleAddFavourite}
        favouritesIds={favouritesIds}
      />
    </div>
  );
};

export default Main;
