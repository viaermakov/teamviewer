import * as React from 'react';

import styles from './table.scss';
import { IPerson } from 'models';

interface ITableComponentProps {
  person: IPerson;
  onAddFavourite: (id: number) => void;
}

const Row: React.FC<ITableComponentProps> = ({ person, onAddFavourite }) => {
  const handleAddFavourite = () => {
    onAddFavourite(person.id);
  };

  return (
    <div className={styles.row} onClick={handleAddFavourite}>
      <div className={styles.cell}>{person.name}</div>
      <div className={styles.cell}>{person.phone}</div>
      <div className={styles.cell}>{person.age}</div>
    </div>
  );
};

export default Row;
