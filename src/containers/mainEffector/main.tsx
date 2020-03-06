import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { useStore } from 'effector-react';

import Context from 'src/context/createContext';
import { getQuery } from 'src/getQuery';

import { Table } from 'components/table';
import { Filters } from 'components/filters';
import { TableIcon } from 'components/icons/table';
import { TileIcon } from 'components/icons/tile';
import { Tabs } from 'components/tabs';

import styles from './main.scss';

import {
  $favouriteIds,
  $isLoading,
  getPersons,
  addFavouritePerson,
  selectPersonsByFilter,
} from 'src/effector/model';

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
  const { lang, changeLang } = React.useContext(Context);

  const location = useLocation();
  const query = getQuery(location);

  const favouriteIds = useStore($favouriteIds);
  const isLoading = useStore($isLoading);
  const persons = selectPersonsByFilter(query);

  const [viewType, setViewType] = React.useState<'preview' | 'table'>('table');

  React.useEffect(() => {
    getPersons();
  }, []);

  const handleChangeLang = (option: IOption) => {
    changeLang && changeLang(option.value);
  };

  const handleAddFavourite = (id: number) => {
    addFavouritePerson(id);
  };

  const handleChangeViewOnTable = (): void => {
    setViewType('table');
  };
  const handleChangeViewOnTile = (): void => {
    setViewType('preview');
  };

  return (
    <div className={styles.layout}>
      <h1>Effector</h1>
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
        favouritesIds={favouriteIds}
      />
    </div>
  );
};

export default Main;
