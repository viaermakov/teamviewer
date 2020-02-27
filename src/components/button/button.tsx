import * as React from 'react';
import cls from 'classnames';

import styles from './button.scss';
interface IButtonProps {
  className: string;
  onClick: () => void;
}

const Button: React.FC<IButtonProps> = ({ children, className, ...rest }) => {
  return (
    <button className={cls(styles.button, className)} {...rest}>
      {children}
    </button>
  );
};

export default Button;
