import * as React from 'react';
import cls from 'classnames';
import styles from './preview.scss';
import { IPerson } from 'src/types';
import { useIntersectionObserver } from 'components/io/io';
import { HeartIcon } from 'components/icons/heart';
import { motion } from 'framer-motion';
import Context from 'src/context/createContext';
import getTranslates from 'src/translates';

const spring = {
  type: 'spring',
  damping: 20,
  stiffness: 100,
};

interface ITableComponentProps {
  person: IPerson;
  onAddFavourite: (id: number) => void;
  isFavourite: boolean;
  isVideoStoppedByUser: boolean;
  onPause: () => void;
}

const Preview: React.FC<ITableComponentProps> = ({
  person,
  onAddFavourite,
  isFavourite,
  isVideoStoppedByUser,
  onPause,
}) => {
  const divRef = React.useRef<HTMLDivElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const { lang } = React.useContext(Context);
  const translates = getTranslates(lang);

  const [isVisible] = useIntersectionObserver(divRef, '-32%');

  React.useEffect(() => {
    async function play() {
      if (!videoRef || !videoRef.current || isVideoStoppedByUser) {
        return;
      }
      const playPromise = await videoRef.current.play();

      if (playPromise !== undefined) {
        return;
      }
      if (isVisible) {
        await videoRef.current.play();
      } else {
        await videoRef.current.pause();
      }
    }

    play();
  }, [videoRef, isVisible, stop]);

  const handleAddToFavourite = React.useCallback(() => {
    onAddFavourite(person.id);
  }, [person.id]);

  return (
    <motion.div
      key={person.id}
      layoutTransition={spring}
      ref={divRef}
      className={cls(
        { [styles.preview]: !Boolean(person.video) },
        { [styles.isFavourite]: isFavourite },
        { [styles.withVideo]: Boolean(person.video) },
      )}
    >
      <div className={cls(styles.text, { [styles.full]: !Boolean(person.video) })}>
        <div className={cls(styles.view, styles.row)}>
          <div className={styles.avatarWrapper}>
            <img className={styles.avatar} src={require(`src/public/images/${person.image}`)}></img>
          </div>
          <span className={styles.name}>{person.name}</span>
        </div>
        <div className={styles.row}>{person.phone}</div>
        <div className={styles.row}>
          {person.age} {translates['years old']}
        </div>
        <div className={styles.row}>{person.phrase}</div>
        <HeartIcon
          onClick={handleAddToFavourite}
          active={isFavourite}
          className={cls(styles.heart)}
        />
      </div>
      {person.video && (
        <div className={styles.media}>
          <video
            ref={videoRef}
            className={styles.video}
            onClick={onPause}
            loop={true}
            muted={true}
            controls={true}
            src={require(`src/public/videos/${person.video}.mp4`)}
          ></video>
        </div>
      )}
    </motion.div>
  );
};

export default Preview;
