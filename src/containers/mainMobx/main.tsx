import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { observer } from 'mobx-react';

import Context from 'src/context/createContext';
import { getQuery } from 'src/getQuery';

import { Table } from 'components/table';
import { Filters } from 'components/filters';
import { TableIcon } from 'components/icons/table';
import { TileIcon } from 'components/icons/tile';
import { Tabs } from 'components/tabs';

import styles from './main.scss';

import { PersonsStore } from 'src/mobx/model';

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

const Main: React.FC<IMainContainerProps> = observer(({}) => {
  const { lang, changeLang } = React.useContext(Context);

  const location = useLocation();
  const query = getQuery(location);
  const [state] = React.useState(new PersonsStore());

  const [viewType, setViewType] = React.useState<'preview' | 'table'>('table');

  React.useEffect(() => {
    state.getSortedPersons(query);
  }, [query.search, query.order, query.sorting]);

  React.useEffect(() => {
    state.getPersons();
  }, []);

  const handleChangeLang = React.useCallback((option: IOption) => {
    changeLang && changeLang(option.value);
  }, []);

  const handleAddFavourite = React.useCallback((id: number) => {
    console.log('object');
    state.addFavouritePerson(id);
  }, []);

  const handleChangeViewOnTable = React.useCallback((): void => {
    setViewType('table');
  }, []);

  const handleChangeViewOnTile = React.useCallback((): void => {
    setViewType('preview');
  }, []);

  return (
    <div className={styles.layout}>
      <h1>Mobx</h1>
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
        persons={state.persons}
        isLoading={state.isLoading}
        onAddFavourite={handleAddFavourite}
        favouritesIds={state.favouriteIds}
      />
    </div>
  );
});

export default Main;
