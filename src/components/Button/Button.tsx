import React from 'react';
import classNames from 'classnames';

import s from './Button.module.scss';

export interface Props {
  className?: string,
  isPrimary?: boolean;
  isDisabled?: boolean;
  isFunctional?: boolean;
  children?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent) => void;
}

const Button = (props: Props) => {
  const {
    type = 'button',
    children,
    className,
    isPrimary,
    isDisabled,
    isFunctional,
    onClick,
  } = props;

  return (
    <button
      type={type}
      className={classNames({
        [s.btn]: true,
        [s.btn__primary]: isPrimary,
        [s.btn__functional]: isFunctional,
        [s.btn__disabled]: isDisabled,
      }, className)}
      disabled={isDisabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
