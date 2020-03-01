import * as React from 'react';
import cls from 'classnames';

import { IPerson } from 'src/types';
import Row from './row';
import Preview from './preview';

import getTranslates from 'src/translates';
import Context from 'src/context/createContext';

import styles from './table.scss';

interface ITableComponentProps {
  persons: IPerson[];
  onAddFavourite: (id: number) => void;
  favouritesIds: number[];
  viewType: 'preview' | 'table';
  isLoading: boolean;
}

const Table: React.FC<ITableComponentProps> = ({
  persons,
  onAddFavourite,
  favouritesIds,
  viewType,
  isLoading,
}) => {
  const [isVideoStoppedByUser, setIsVideoStoppedByUser] = React.useState(false);
  const { lang } = React.useContext(Context);
  const translates = getTranslates(lang);

  const handlePauseByUser = () => {
    setIsVideoStoppedByUser(true);
  };

  if (isLoading) {
    return <div>{translates['Loading']}...</div>;
  }

  if (!persons || persons.length === 0) {
    return <div>{translates['No results. Try to use other filters']}...</div>;
  }

  const renderView = (person: IPerson): React.ReactElement | null => {
    if (viewType === 'preview') {
      return (
        <Preview
          key={person.id}
          isVideoStoppedByUser={isVideoStoppedByUser}
          onPause={handlePauseByUser}
          person={person}
          onAddFavourite={onAddFavourite}
          isFavourite={favouritesIds.includes(person.id)}
        />
      );
    }
    if (viewType === 'table') {
      return (
        <Row
          key={person.id}
          person={person}
          onAddFavourite={onAddFavourite}
          isFavourite={favouritesIds.includes(person.id)}
        />
      );
    }

    return null;
  };

  return (
    <div className={cls(styles.standartTable, { [styles.previewTable]: viewType === 'preview' })}>
      {persons.map(person => renderView(person))}
    </div>
  );
};

export default Table;
