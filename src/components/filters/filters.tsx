import * as React from 'react';
import qs from 'qs';
import styles from './filters.scss';
import { useHistory, useLocation } from 'react-router-dom';
import { Input } from 'components/input';
import { Tabs } from 'components/tabs';

import { getQuery } from 'src/getQuery';
import getTranslates from 'src/translates';
import Context from 'src/context/createContext';

interface Props {}
interface IOption {
  id: number;
  label: string;
  value: string;
}

const orderOptions: IOption[] = [
  { id: 0, label: '↑', value: 'asc' },
  { id: 1, label: '↓', value: 'desc' },
];

const Filters: React.FC<Props> = () => {
  const history = useHistory();
  const location = useLocation();
  const query = getQuery(location);
  const { lang } = React.useContext(Context);
  const translates = getTranslates(lang);

  const options: IOption[] = [
    { id: 0, label: translates['by age'], value: 'age' },
    { id: 1, label: translates['by id'], value: 'id' },
    { id: 2, label: translates['by name'], value: 'name' },
  ];

  const handleSort = React.useCallback((option: IOption): void => {
    const queryString = qs.stringify({ ...query, sorting: option.value });
    history.push({ search: decodeURIComponent(queryString) });
  }, []);

  const handleOrder = React.useCallback((option: IOption): void => {
    const queryString = qs.stringify({ ...query, order: option.value });
    history.push({ search: decodeURIComponent(queryString) });
  }, []);

  const handleChange = React.useCallback((value: string) => {
    const queryString = qs.stringify({ ...query, search: value });
    history.push({ search: decodeURIComponent(queryString) });
  }, []);

  return (
    <div className={styles.filters}>
      <Input className={styles.input} onChange={handleChange} value={query.search} />
      <div className={styles.tabs}>
        <div className={styles.sorting}>
          <span className={styles.title}>{translates['Sort by']}</span>
          <Tabs<IOption>
            className={styles.sortButtons}
            onClick={handleSort}
            options={options}
            value={query.sorting || 'id'}
          />
        </div>
        <Tabs<IOption>
          value={query.order}
          className={styles.arrows}
          onClick={handleOrder}
          options={orderOptions}
        />
      </div>
    </div>
  );
};

export default Filters;
