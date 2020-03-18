import * as React from 'react';
import cls from 'classnames';
import { motion } from 'framer-motion';

import { IPerson } from 'src/types';
import { HeartIcon } from 'components/icons/heart';
import Context from 'src/context/createContext';
import getTranslates from 'src/translates';

import styles from './row.scss';

const spring = {
  type: 'spring',
  damping: 20,
  stiffness: 100,
};

interface ITableComponentProps {
  person: IPerson;
  isFavourite: boolean;
  onAddFavourite: (id: number) => void;
}

const Row: React.FC<ITableComponentProps> = ({ person, onAddFavourite, isFavourite }) => {
  const { lang } = React.useContext(Context);
  const translates = getTranslates(lang);

  const handleAddToFavourite = React.useCallback(() => {
    onAddFavourite(person.id);
  }, []);

  return (
    <motion.div key={person.id} layoutTransition={spring}>
      <div className={styles.row}>
        <div className={styles.text}>
          <div className={styles.name}>{person.name}</div>
          <div className={styles.phrase}>{person.phrase}</div>
        </div>
        <div className={styles.cell}>{person.phone}</div>
        <div className={styles.cell}>
          {person.age} {translates['years old']}
        </div>
        <div className={styles.cell}>
          <HeartIcon
            onClick={handleAddToFavourite}
            active={isFavourite}
            className={cls(styles.heart)}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Row;
