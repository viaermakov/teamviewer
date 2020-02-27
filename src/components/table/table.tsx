import * as React from 'react';

// import { CSSTransition, TransitionGroup } from 'react-transition-group';

import styles from './table.scss';
import { IPerson } from 'models';
import Row from './row';

interface ITableComponentProps {
  persons: IPerson[];
  onAddFavourite: (id: number) => void;
}

const Table: React.FC<ITableComponentProps> = ({ persons, onAddFavourite }) => {
  if (!persons || persons.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.table}>
      {persons.map(person => {
        return <Row person={person} onAddFavourite={onAddFavourite} />;
      })}
    </div>
  );
};

export default Table;
