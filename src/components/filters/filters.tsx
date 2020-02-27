import * as React from 'react';
import qs from 'qs';
import { Button } from 'components/button';

import styles from './filters.scss';
import { useHistory, useLocation } from 'react-router-dom';
import { Input } from 'components/input';
import { getQuery } from 'src/getQuery';

interface Props {}

const Filters: React.FC<Props> = () => {
  const history = useHistory();
  const location = useLocation();
  const query = getQuery(location);

  const handleSortByAge = () => {
    handleSort('age');
  };
  const handleSortByName = () => {
    handleSort('name');
  };

  const handleSort = (type: string) => {
    const queryString = qs.stringify({ sorting: type });
    history.push({ search: decodeURIComponent(queryString) });
  };

  const handleChange = (value: string) => {
    const queryString = qs.stringify({ ...query, search: value });
    history.push({ search: decodeURIComponent(queryString) });
  };

  return (
    <div className={styles.filters}>
      <Input onChange={handleChange} value={query.search} />
      <Button className={styles.button} onClick={handleSortByAge}>
        By age
      </Button>
      <Button className={styles.button} onClick={handleSortByName}>
        By name
      </Button>
    </div>
  );
};

export default Filters;
